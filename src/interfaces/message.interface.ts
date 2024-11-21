interface ChatMessage {
    id: number;
    message: string;
    role: 'user' | 'bot';
}

export type ChatMessages = Array<ChatMessage>;

interface TextContent {
    type: 'text';
    text: string;
}

interface SystemMessage {
    role: 'system';
    content: TextContent[];
}

interface AssistantMessage {
    role: 'assistant';
    content: string;
}

interface UserMessage {
    role: 'user';
    content: string;
}

export type AiMessages = Array<SystemMessage | AssistantMessage | UserMessage>;
