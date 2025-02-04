import { useChatHandlers } from './hooks/useChatHandlers';
import { ChatMessage } from './interfaces/message.interface';

type ChatSectionProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const ChatSection = ({ setSourceCode, setCurrentTab }: ChatSectionProps) => {
    const { chatMessages, value, changeHandler, handleSubmit } = useChatHandlers({ setSourceCode, setCurrentTab });

    const userChatStyles = 'bg-blue-500 text-white ml-auto transform transition-all duration-200 ease-out';
    const aiChatStyles = 'border border-slate-200 bg-white shadow-sm transform transition-all duration-200 ease-out';

    return (
        <section className="flex flex-col h-full w-full border-r">
            <div className="flex-1 flex flex-col gap-3 p-4 bg-gray-50 overflow-y-auto">
                {chatMessages.map((message: ChatMessage, index: number) => (
                    <p
                        key={message.content}
                        className={`p-3 rounded-lg w-fit max-w-[80%] text-base
                             ${index % 2 !== 0 ? userChatStyles : aiChatStyles}
                        `}
                    >
                        {message.content}
                    </p>
                ))}
            </div>

            <form className="flex h-24 gap-3 p-4 bg-white border-t border-gray-100" onSubmit={handleSubmit}>
                <textarea
                    className="flex-1 px-4 py-2 text-lg border rounded-lg border-gray-200 focus:border-blue-400 focus:outline-none transition-colors duration-200 resize-none placeholder:text-gray-400"
                    placeholder="Type your instructions here..."
                    name="prompt"
                    id="prompt"
                    rows={2}
                    draggable={false}
                    onChange={changeHandler}
                    value={value}
                />
                <button
                    type="submit"
                    className="h-full aspect-square flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>
        </section>
    );
};
