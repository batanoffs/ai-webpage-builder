type ChatFormProps = {
    handlePromptSubmit: (event: React.FormEvent) => void;
    changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
};

export const ChatForm = ({ handlePromptSubmit, changeHandler, value }: ChatFormProps) => {
    return (
        <form className="flex h-24 gap-3 p-4 bg-white border-t border-gray-100" onSubmit={handlePromptSubmit}>
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
    );
};
