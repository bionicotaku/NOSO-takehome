"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Annotation, MetaData, TranscriptItem, ComplianceItem } from "../types/schema";
import { SummarySection } from "./SummarySection";
import { MessageRow } from "./MessageRow";
import { AnnotationCard } from "./AnnotationCard";
import { ComplianceSection } from "./ComplianceSection";
import { calculateAnnotationPositions } from "../lib/alignment";

interface TranscriptReviewerProps {
    transcript: TranscriptItem[];
    annotations: Annotation[];
    meta: MetaData;
    checklist: ComplianceItem[];
}

export default function TranscriptReviewer({ transcript, annotations, meta, checklist }: TranscriptReviewerProps) {
    // State for layout measurements
    const [lineMeasurements, setLineMeasurements] = useState<Record<number, { top: number; height: number }>>({});
    const [cardHeights, setCardHeights] = useState<Record<number, number>>({});
    const [layout, setLayout] = useState<Record<number, number>>({});
    const [activeAnnotationId, setActiveAnnotationId] = useState<number | null>(null);

    // Refs to measure DOM elements
    const transcriptRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Helper to get active color
    const getHighlightColor = (itemId: number): string | null => {
        if (!activeAnnotationId) return null;
        const ann = annotations.find(a => a.id === activeAnnotationId);
        if (!ann) return null;

        // Only highlight if exact match or within range?
        // Usually we highlight the whole range.
        if (itemId >= ann.start_line_id && itemId <= ann.end_line_id) {
            // ... existing active highlight logic if we want to keep it?
            // The user didn't ask to remove the highlight, just to ADD the bar.
            // But usually the bar IS the highlight indicator.
            // Let's keep the bg highlight for now unless it conflicts.
            const CATEGORY_COLORS: Record<string, string> = {
                "Introduction": "blue",
                "Problem Diagnosis": "red",
                "Solution Explanation": "indigo",
                "Upsell Attempts": "amber",
                "Maintenance Plan Offer": "emerald",
                "Closing & Thank You": "purple",
                "Sales Insights": "pink",
            };
            return CATEGORY_COLORS[ann.category] || "gray";
        }
        return null;
    };


    // 1. Measure Line Positions (Transcript)
    const measureLines = () => {
        if (!transcriptRef.current) return;

        const newMeasurements: Record<number, { top: number; height: number }> = {};

        transcript.forEach((item) => {
            const el = document.getElementById(`line-${item.id}`);
            if (el) {
                newMeasurements[item.id] = {
                    top: el.offsetTop,
                    height: el.offsetHeight
                };
            }
        });
        setLineMeasurements(newMeasurements);
    };

    // 2. Measure Card Heights
    const measureCards = () => {
        const newCardHeights: Record<number, number> = {};
        annotations.forEach((ann) => {
            const el = document.getElementById(`annotation-${ann.id}`);
            if (el) {
                newCardHeights[ann.id] = el.offsetHeight;
            }
        });
        setCardHeights(newCardHeights);
    };

    // Trigger measurements
    useEffect(() => {
        // Delay slightly to ensure render
        const t = setTimeout(() => {
            measureLines();
            measureCards();
        }, 100);

        const handleResize = () => {
            measureLines();
            measureCards();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", handleResize);
        }
    }, [transcript, annotations]);

    // 3. Calculate Layout
    useLayoutEffect(() => {
        // Calculate layout using just tops for alignment
        // We map the Record<{top, height}> back to Record<number> for the existing algo
        const lineTops: Record<number, number> = {};
        Object.entries(lineMeasurements).forEach(([k, v]) => {
            lineTops[Number(k)] = v.top;
        });

        const result = calculateAnnotationPositions(annotations, lineTops, cardHeights);
        setLayout(result.positions);
    }, [annotations, lineMeasurements, cardHeights]);

    // Helper to render connection bars
    const renderConnectionBars = () => {
        return annotations.map(ann => {
            const start = lineMeasurements[ann.start_line_id];
            const end = lineMeasurements[ann.end_line_id];

            if (!start || !end) return null;

            const top = start.top;
            const height = (end.top + end.height) - start.top;

            const CATEGORY_COLORS: Record<string, string> = {
                "Introduction": "bg-blue-400",
                "Problem Diagnosis": "bg-red-400",
                "Solution Explanation": "bg-indigo-400",
                "Upsell Attempts": "bg-amber-400",
                "Maintenance Plan Offer": "bg-emerald-400",
                "Closing & Thank You": "bg-purple-400",
                "Sales Insights": "bg-pink-400",
            };

            const colorClass = CATEGORY_COLORS[ann.category] || "bg-gray-400";
            const isActive = activeAnnotationId === ann.id;

            return (
                <div
                    key={`bar-${ann.id}`}
                    className={`absolute w-1.5 rounded-full right-0 transition-opacity duration-200 ${colorClass} ${isActive ? 'opacity-100 ring-2 ring-offset-1 ring-gray-200' : 'opacity-40 hover:opacity-80'}`}
                    style={{
                        // Subtract a bit of padding/margin?
                        // Actually, let's match exact message bounds.
                        // But messages have 'py-4', so the visual text content is smaller.
                        // If we want it to look like it brackets the TEXT, we might want inset.
                        // But 'py-4' is inside the hover area.
                        // Let's try matching the full row block first, maybe inset top/bottom by 4px.
                        top: top + 8,
                        height: height - 16
                    }}
                    onMouseEnter={() => setActiveAnnotationId(ann.id)}
                    onMouseLeave={() => setActiveAnnotationId(null)}
                />
            );
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Unified Hero Section */}
            <div className="bg-white border-b border-gray-200 shadow-sm mb-8">
                <SummarySection meta={meta} />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="border-t border-gray-100" />
                </div>
                <ComplianceSection items={checklist} />
            </div>

            <main className="flex-grow w-full max-w-7xl mx-auto md:grid md:grid-cols-12 md:gap-8 px-4 relative">

                {/* Left Column: Transcript (Width 8/12 approx 66%) */}
                <div ref={transcriptRef} className="md:col-span-8 pb-32 relative space-y-2 pt-8">
                    {transcript.map((item) => (
                        <MessageRow
                            key={item.id}
                            item={item}
                            highlightColor={getHighlightColor(item.id)}
                        />
                    ))}

                    {/* Connection Bars Layer - Rendered INSIDE the transcript column, absolute positioned to the right */}
                    <div className="absolute top-0 right-[-16px] h-full w-4 pointer-events-auto">
                        {/*
                 Right -16px puts it in the middle of the 32px gap (gap-8 = 2rem = 32px).
                 Perfectly centered in the gutter.
               */}
                        {renderConnectionBars()}
                    </div>
                </div>

                {/* Right Column: Annotations Sidebar (Width 4/12 approx 33%) */}
                {/* Added pt-8 to align with transcript start */}
                <div ref={sidebarRef} className="hidden md:block md:col-span-4 relative pt-8">
                    <div className="relative h-full">
                        {annotations.map((ann) => {
                            const top = layout[ann.id];
                            const isMeasured = top !== undefined;

                            return (
                                <div
                                    key={`wrapper-${ann.id}`}
                                    id={`annotation-${ann.id}`}
                                    style={{
                                        position: "absolute",
                                        top: isMeasured ? top : 0,
                                        width: '100%',
                                        opacity: isMeasured ? 1 : 0,
                                        transition: "top 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
                                    }}
                                >
                                    <AnnotationCard
                                        annotation={ann}
                                        onMouseEnter={() => setActiveAnnotationId(ann.id)}
                                        onMouseLeave={() => setActiveAnnotationId(null)}
                                        isActive={activeAnnotationId === ann.id}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile View: Simple stacking for now (as fallback) */}
                <div className="md:hidden space-y-4 mt-8 pb-12 border-t pt-8">
                    <h3 className="text-lg font-bold text-gray-900 px-2">Analysis Notes</h3>
                    {annotations.map(ann => (
                        <div key={ann.id} className="relative">
                            <AnnotationCard annotation={ann} style={{ position: 'relative' }} />
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
