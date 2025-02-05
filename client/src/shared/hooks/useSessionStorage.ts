import { OpenAIConfig } from '../types/aiSettings.type';

export const useSessionStorage = (key: string, initialValue: OpenAIConfig): OpenAIConfig => {
    const persistStateSerialized = sessionStorage.getItem(key);
    if (persistStateSerialized) {
        try {
            return JSON.parse(persistStateSerialized);
        } catch (e) {
            console.error('Failed to parse saved settings:', e);
            return initialValue;
        }
    }
    return initialValue;
};
