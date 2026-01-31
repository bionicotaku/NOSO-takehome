import { FileText, Search } from "lucide-react";
import { MetaData } from "../types/schema";

interface HeaderProps {
    meta: MetaData;
}

export function Header({ meta }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left: Brand / Title */}
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">
                            Smart Transcript Reviewer
                        </h1>
                        <p className="text-xs text-gray-500">
                            {meta.call_type} • Score: {meta.overall_score}
                        </p>
                    </div>
                </div>

                {/* Right: Actions (Placeholder) */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-500">
                        <Search size={16} />
                        <span>Search transcript...</span>
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                        Share Report
                    </button>
                </div>
            </div>
        </header>
    );
}
