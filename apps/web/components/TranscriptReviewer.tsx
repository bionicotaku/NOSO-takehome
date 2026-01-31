"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Annotation, MetaData, TranscriptItem } from "../types/schema";
import { Header } from "./Header";
import { MessageRow } from "./MessageRow";
import { AnnotationCard } from "./AnnotationCard";
import { calculateAnnotationPositions } from "../lib/alignment";

interface TranscriptReviewerProps {
    transcript: TranscriptItem[];
    annotations: Annotation[];
    meta: MetaData;
}

export default function TranscriptReviewer({ transcript, annotations, meta }: TranscriptReviewerProps) {
    // State for layout measurements
    const [linePositions, setLinePositions] = useState<Record<number, number>>({});
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

        if (itemId >= ann.start_line_id && itemId <= ann.end_line_id) {
            // Map category to color name
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

        const newLinePositions: Record<number, number> = {};

        transcript.forEach((item) => {
            const el = document.getElementById(`line-${item.id}`);
            if (el) {
                newLinePositions[item.id] = el.offsetTop;
            }
        });
        setLinePositions(newLinePositions);
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
        const result = calculateAnnotationPositions(annotations, linePositions, cardHeights);
        setLayout(result.positions);
    }, [annotations, linePositions, cardHeights]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header meta={meta} />

            <main className="flex-grow w-full max-w-7xl mx-auto md:grid md:grid-cols-12 md:gap-8 pt-8 px-4 relative">

                {/* Left Column: Transcript (Width 7/12 approx 58%) */}
                <div ref={transcriptRef} className="md:col-span-7 pb-32 relative space-y-2">
                    {transcript.map((item) => (
                        <MessageRow
                            key={item.id}
                            item={item}
                            highlightColor={getHighlightColor(item.id)}
                        />
                    ))}
                </div>

                {/* Right Column: Annotations Sidebar (Width 5/12 approx 41%) */}
                <div ref={sidebarRef} className="hidden md:block md:col-span-5 relative">
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
