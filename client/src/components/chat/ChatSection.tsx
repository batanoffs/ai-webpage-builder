import { useChatHandlers } from './useChatHandlers';

type ChatSectionProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const ChatSection = ({ setSourceCode, setCurrentTab }: ChatSectionProps) => {
    const { chatMessages, value, changeHandler, handleSubmit } = useChatHandlers({ setSourceCode, setCurrentTab });
    return (
        <section className="flex sticky flex-col h-[100dvh] w-[50%] border-r-[1px]">
            <div className="h-[5dvh] border-b-[1px] pl-4 flex items-center">
                <h1 className="font-bold">AI Webpage Builder</h1>
            </div>
            <div className="flex flex-col gap-2 p-4 h-[90dvh] border-b-[1px] bg-gray-50 overflow-y-scroll no-scrollbar">
                {chatMessages.map((entry, index) => (
                    <p
                        key={entry.content}
                        className={`p-2 rounded-md w-fit min-w-fit ${
                            index % 2 !== 0 ? 'bg-blue-500 text-white' : 'border border-slate-200 bg-white'
                        }`}
                    >
                        {entry.content}
                    </p>
                ))}
            </div>

            <form className="flex h-[5dvh] gap-2 m-4" onSubmit={handleSubmit}>
                <input
                    className="flex-1 p-4 resize-none border rounded-md border-neutral-500"
                    placeholder={'Type your instructions here...'}
                    type="text"
                    name="prompt"
                    draggable={false}
                    onChange={changeHandler}
                    value={value}
                />
                <input
                    className="border-none rounded-md hover:cursor-pointer w-[40px] bg-button-icon bg-no-repeat
                     bg-blue-600 hover:bg-blue-400"
                    type="submit"
                    value={''}
                />
            </form>
        </section>
    );
};
