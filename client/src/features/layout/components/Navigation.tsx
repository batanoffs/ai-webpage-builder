import { NavigationProps } from '../types/navigation.interface';

export const Navigation = ({ currentTab, setCurrentTab }: NavigationProps) => {
    const toggleTabHandler = () => {
        setCurrentTab(currentTab === 'PREVIEW' ? 'CODE' : 'PREVIEW');
    };

    const baseButtonStyles = "h-full px-6 transition-all duration-200 flex items-center gap-2 font-medium relative";
    const activeStyles = "text-blue-500";
    const inactiveStyles = "text-gray-500 hover:text-gray-700";

    return (
        <section className="h-14 flex items-center bg-white">
            <button
                className={`${baseButtonStyles} ${currentTab === 'PREVIEW' ? activeStyles : inactiveStyles}`}
                onClick={toggleTabHandler}
            >
                <svg 
                    className={`w-4 h-4 transition-colors duration-200 ${
                        currentTab === 'PREVIEW' ? 'stroke-blue-500' : 'stroke-gray-500'
                    }`}
                    viewBox="0 0 24 24" 
                    fill="none"
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>Preview</span>
                {currentTab === 'PREVIEW' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 animate-[slideIn_0.2s_ease-out]" />
                )}
            </button>
            <button
                onClick={toggleTabHandler}
                className={`${baseButtonStyles} ${currentTab === 'CODE' ? activeStyles : inactiveStyles}`}
            >
                <svg 
                    className={`w-4 h-4 transition-colors duration-200 ${
                        currentTab === 'CODE' ? 'stroke-blue-500' : 'stroke-gray-500'
                    }`}
                    viewBox="0 0 24 24" 
                    fill="none"
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                </svg>
                <span>Code</span>
                {currentTab === 'CODE' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 animate-[slideIn_0.2s_ease-out]" />
                )}
            </button>
        </section>
    );
};
