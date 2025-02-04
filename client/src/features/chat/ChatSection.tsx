import { useChatHandlers } from './hooks/useChatHandlers';
import { ChatMessage } from './interfaces/message.interface';

type ChatSectionProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const ChatSection = ({ setSourceCode, setCurrentTab }: ChatSectionProps) => {
    const { chatMessages, value, changeHandler, handleSubmit } = useChatHandlers({ setSourceCode, setCurrentTab });

    const userChatStyles = 'bg-blue-500 text-white';
    const aiChatStyles = 'border border-slate-200 bg-white';

    return (
        <section className="flex flex-col h-full w-full border-r">
            <div className="flex-1 flex flex-col gap-2 p-4 bg-gray-50 overflow-y-auto">
                {chatMessages.map((message: ChatMessage, index: number) => (
                    <p
                        key={message.content}
                        className={`p-2 rounded-md w-fit min-w-fit ${index % 2 !== 0 ? userChatStyles : aiChatStyles}`}
                    >
                        {message.content}
                    </p>
                ))}
            </div>

            <form className="flex h-18 gap-2 p-4" onSubmit={handleSubmit}>
                <input
                    className="flex-1 p-4 resize-none border rounded-md border-neutral-500"
                    placeholder={'Type your instructions here...'}
                    type="text"
                    name="prompt"
                    id="prompt"
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
