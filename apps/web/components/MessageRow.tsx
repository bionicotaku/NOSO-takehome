import { TranscriptItem } from "../types/schema";
import { SpeakerAvatar } from "./SpeakerAvatar";

interface MessageRowProps {
    item: TranscriptItem;
    highlightColor?: string | null;
}

export function MessageRow({ item, highlightColor }: MessageRowProps) {
    const isTechnician = item.speaker === "Technician";

    // Determine background color
    // If highlighted, mix the color. Since we can't easily mix in Tailwind classes dynamically without full map,
    // we can use style for the background color if highlighted, or a specific class map.
    // Design said: bg-{color}-100/50.

    let bgClass = isTechnician ? "bg-white" : "bg-slate-50/50";
    let style = {};

    if (highlightColor) {
        // Override background with highlight color
        // We expect highlightColor to be like 'blue', 'red'.
        // We map it to bg class.
        const highlightBg = {
            "blue": "bg-blue-100/50",
            "red": "bg-red-100/50",
            "indigo": "bg-indigo-100/50",
            "amber": "bg-amber-100/50",
            "emerald": "bg-emerald-100/50",
            "purple": "bg-purple-100/50",
            "pink": "bg-pink-100/50",
            "gray": "bg-gray-100/50"
        }[highlightColor];

        if (highlightBg) bgClass = highlightBg;
    }

    return (
        <div
            id={`line-${item.id}`}
            className={`
        flex gap-4 py-4 px-4 rounded-lg transition-colors duration-200 group
        ${bgClass}
        hover:bg-gray-50
      `}
            style={style}
        >
            <SpeakerAvatar speaker={item.speaker} />

            <div className="flex-grow pt-1 min-w-0">
                <div className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">
                    {item.speaker}
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {item.text}
                </p>
            </div>
        </div>
    );
}
