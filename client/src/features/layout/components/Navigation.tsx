interface NavigationProps {
    currentTab: 'PREVIEW' | 'CODE';
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
}

export const Navigation = ({ currentTab, setCurrentTab }: NavigationProps) => {
    const toggleTabHandler = () => {
        setCurrentTab(currentTab === 'PREVIEW' ? 'CODE' : 'PREVIEW');
    };

    return (
        <section className="h-14 flex items-center">
            <button
                className={`h-full px-6 transition-colors hover:bg-gray-50 flex items-center gap-2 ${
                    currentTab === 'PREVIEW' 
                        ? 'text-blue-500 border-b-2 border-blue-500' 
                        : 'text-gray-500'
                }`}
                onClick={toggleTabHandler}
            >
                <img
                    className="w-4 h-4"
                    src="./preview.svg"
                    alt="eye icon"
                />
                <span>Preview</span>
            </button>
            <button
                onClick={toggleTabHandler}
                className={`h-full px-6 transition-colors hover:bg-gray-50 flex items-center gap-2 ${
                    currentTab === 'CODE'
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : 'text-gray-500'
                }`}
            >
                <span>{'< >'}</span>
                <span>Code</span>
            </button>
        </section>
    );
};
