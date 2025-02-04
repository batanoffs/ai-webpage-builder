export type ChatMessage = {
    role?: 'user' | 'assistant' | 'system';
    content: string;
};

export type ChatMessages = ChatMessage[];
