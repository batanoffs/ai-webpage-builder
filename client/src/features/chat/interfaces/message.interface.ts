export type ChatMessage = {
    role?: 'user' | 'assistant' | 'system';
    content: string;
    isError?: boolean;
};

export type ChatMessages = ChatMessage[];
