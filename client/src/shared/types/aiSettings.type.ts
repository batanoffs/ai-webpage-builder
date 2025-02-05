import { Dispatch, SetStateAction } from 'react';

export interface OpenAIConfig {
    apiKey: string;
    temperature: number;
    model: string;
}

export interface AiContextType {
    aiSettings: OpenAIConfig;
    setAiSettings: Dispatch<SetStateAction<OpenAIConfig>>;
    hasApiKey: boolean;
    isOpenModal: boolean;
    toggleSettingsModal: () => void;
}
