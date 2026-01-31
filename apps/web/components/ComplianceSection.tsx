import { CheckCircle, XCircle, AlertCircle, Star } from "lucide-react";
import { ComplianceItem } from "../types/schema";

interface ComplianceSectionProps {
    items: ComplianceItem[];
}

export function ComplianceSection({ items }: ComplianceSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 pb-8 pt-4">
                <div className="mb-4 flex items-center gap-2 text-gray-800">
                    <CheckCircle className="text-blue-600" size={20} />
                    <h2 className="text-xl font-bold">Compliance Checklist</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => {
                        const isPresent = item.status === "present";
                        const isMissing = item.status === "missing_in_transcript" || item.status === "missing";

                        return (
                            <div
                                key={index}
                                className={`
                                    rounded-xl border p-4 flex flex-col gap-3 transition-shadow hover:shadow-md
                                    ${isPresent ? 'bg-white border-gray-200' : 'bg-red-50/30 border-red-100'}
                                `}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`
                                            w-2 h-2 rounded-full 
                                            ${isPresent ? 'bg-emerald-500' : 'bg-red-500'}
                                        `} />
                                        <h3 className="font-semibold text-gray-900">{item.step_name}</h3>
                                    </div>

                                    {/* Score / Quality */}
                                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mr-1">Score</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const score = item.score;
                                                const isFull = score >= star;
                                                const isHalf = score >= star - 0.5 && score < star;

                                                return (
                                                    <div key={star} className="relative">
                                                        <Star size={14} className="text-gray-200" fill="currentColor" />
                                                        {(isFull || isHalf) && (
                                                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: isHalf ? '50%' : '100%' }}>
                                                                <Star
                                                                    size={14}
                                                                    className={
                                                                        score >= 4 ? 'text-emerald-500' :
                                                                            score >= 2.5 ? 'text-amber-500' : 'text-red-500'
                                                                    }
                                                                    fill="currentColor"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Description & Comment */}
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        {item.description}
                                    </p>

                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            {isPresent ? (
                                                <CheckCircle size={16} className="text-emerald-500" />
                                            ) : (
                                                <XCircle size={16} className="text-red-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {item.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
