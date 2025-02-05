import { ChatMessage } from '../interfaces/message.interface';

const userChatStyles = 'bg-blue-500 text-white ml-auto transform transition-all duration-200 ease-out';
const aiChatStyles = 'border border-slate-200 bg-white shadow-sm transform transition-all duration-200 ease-out';
const errorStyles =
    'border border-red-100 bg-red-50 text-red-600 shadow-sm transform transition-all duration-200 ease-out';

const getMessageStyles = (message: ChatMessage, isUser: boolean) => {
    if (isUser) return userChatStyles;
    return message.isError ? errorStyles : aiChatStyles;
};

type MessageProps = {
    message: ChatMessage;
    index: number;
};

export const Message = ({ message, index }: MessageProps) => {
    return (
        <p className={`p-3 rounded-lg w-fit max-w-[80%] text-base ${getMessageStyles(message, index % 2 !== 0)}`}>
            {message.content}
        </p>
    );
};
