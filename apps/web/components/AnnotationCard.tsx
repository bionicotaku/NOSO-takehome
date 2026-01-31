import { Annotation, AnnotationCategory } from "../types/schema";

interface AnnotationCardProps {
    annotation: Annotation;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isActive?: boolean;
}

const CATEGORY_COLORS: Record<AnnotationCategory, string> = {
    "Introduction": "blue",
    "Problem Diagnosis": "red",
    "Solution Explanation": "indigo",
    "Upsell Attempts": "amber",
    "Maintenance Plan Offer": "emerald",
    "Closing & Thank You": "purple",
    "Sales Insights": "pink",
};

export function AnnotationCard({ annotation, style, onMouseEnter, onMouseLeave, isActive }: AnnotationCardProps) {
    const color = CATEGORY_COLORS[annotation.category] || "gray";

    // Tailwind v4 dynamic classes might need complete strings or mapped safe lists.
    // We'll use inline styles or specific mappings for border/bg to be safe if v4 just-in-time doesn't pick up dynamic strings.
    // Actually, standard Tailwind requires full class names. Map them explicitly.

    const bgClass = {
        "blue": "bg-blue-50",
        "red": "bg-red-50",
        "indigo": "bg-indigo-50",
        "amber": "bg-amber-50",
        "emerald": "bg-emerald-50",
        "purple": "bg-purple-50",
        "pink": "bg-pink-50",
        "gray": "bg-gray-50"
    }[color];

    // Active state style enhancement
    const activeStyle = isActive ? `shadow-md transform -translate-x-1` : "";

    return (
        <div
            className={`
        absolute left-0 right-0 p-4 rounded-xl shadow-sm text-base
        transition-all duration-200
        hover:shadow-md hover:translate-x-1
        cursor-pointer
        ${bgClass} ${activeStyle}
      `}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold uppercase tracking-wider text-${color}-700 opacity-75`}>
                    {annotation.category}
                </span>
                <span className="text-sm text-gray-400">#{annotation.id}</span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-1">
                {annotation.title}
            </h4>

            <p className="text-gray-600 leading-snug">
                {annotation.content}
            </p>
        </div>
    );
}
