import { User, Wrench } from "lucide-react";
import { TranscriptSpeaker } from "../types/schema";

interface SpeakerAvatarProps {
    speaker: TranscriptSpeaker;
}

export function SpeakerAvatar({ speaker }: SpeakerAvatarProps) {
    const isTechnician = speaker === "Technician";

    return (
        <div className="flex-shrink-0 w-12 flex justify-center">
            <div
                className={`
          w-10 h-10 rounded-full 
          flex items-center justify-center 
          shadow-sm select-none
          ${isTechnician ? "bg-blue-600 text-white" : "bg-amber-500 text-white"}
        `}
                title={speaker}
            >
                {isTechnician ? <Wrench size={20} /> : <User size={20} />}
            </div>
        </div>
    );
}
