export interface SummarySectionProps {
    meta: MetaData;
}

import { FileText, Star, Activity } from "lucide-react";
import { MetaData } from "../types/schema";

export function SummarySection({ meta }: SummarySectionProps) {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    {/* Main Title & Summary */}
                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-3 text-blue-600 mb-2">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <FileText size={24} />
                            </div>
                            <span className="font-semibold tracking-wide uppercase text-sm">Transcript Analysis</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {meta.call_type}
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            {meta.summary}
                        </p>
                    </div>

                    {/* Stats / Score Card */}
                    <div className="flex-shrink-0 bg-gray-50 rounded-xl p-6 border border-gray-100 min-w-[240px]">
                        <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm font-medium uppercase tracking-wider">
                            <Activity size={16} />
                            <span>Overall Score</span>
                        </div>

                        <div className="flex items-end gap-3 mb-2">
                            <span className={`text-5xl font-black ${meta.overall_score >= 4 ? 'text-emerald-600' :
                                meta.overall_score >= 2.5 ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                {meta.overall_score}
                            </span>
                            <span className="text-gray-400 font-bold mb-2 text-lg">/ 5</span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const score = meta.overall_score;
                                const isFull = score >= star;
                                const isHalf = score >= star - 0.5 && score < star;

                                return (
                                    <div key={star} className="relative">
                                        {/* Empty Background Star */}
                                        <Star size={20} className="text-gray-200" fill="currentColor" />

                                        {/* Filled/Half Overlay */}
                                        {(isFull || isHalf) && (
                                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: isHalf ? '50%' : '100%' }}>
                                                <Star size={20} className={
                                                    meta.overall_score >= 4 ? 'text-emerald-500' :
                                                        meta.overall_score >= 2.5 ? 'text-amber-500' : 'text-red-500'
                                                } fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
