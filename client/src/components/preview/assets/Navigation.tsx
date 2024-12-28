import { NavigationProps } from '../../../interfaces/index';

export const Navigation = ({ currentTab, setCurrentTab }: NavigationProps) => {
    const toggleTabHandler = () => {
        setCurrentTab(currentTab === 'PREVIEW' ? 'CODE' : 'PREVIEW');
    };

    return (
        <section className="flex border-b-[1px] text-gray-500">
            <button
                className={`py-2 px-4  ${
                    currentTab === 'PREVIEW' ? 'border text-blue-500 border-blue-500' : 'fill-slate-500'
                }`}
                onClick={toggleTabHandler}
            >
                <img
                    className={`w-4 h-4 inline-block mr-2 `}
                    src="./preview.svg"
                    alt="eye icon"
                    style={{ fill: 'blue' }} // change the fill color to blue
                />
                Preview
            </button>
            <button
                onClick={toggleTabHandler}
                className={`py-2 px-4 ${
                    currentTab === 'CODE' ? 'border text-blue-500 border-blue-500' : 'fill-slate-500'
                }`}
            >
                <span>{'< >'}</span> Code
            </button>
        </section>
    );
};
