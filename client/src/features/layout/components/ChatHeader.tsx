export const ChatHeader = () => (
    <header className="h-14 px-6 flex items-center">
        <h1 className="font-semibold text-gray-800 flex items-center gap-2">
            <svg 
                className="w-5 h-5 stroke-blue-500" 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 3v18"/>
                <path d="M15 3v18"/>
                <path d="M3 9h18"/>
                <path d="M3 15h18"/>
            </svg>
            AI Webpage Builder
        </h1>
    </header>
);
