import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useSessionStorage } from '../hooks';
import { defaultSettings } from '../constants';
import { OpenAIConfig, AiContextType } from '../types';

const AiConfigContext = createContext<AiContextType>({
    aiSettings: defaultSettings,
    setAiSettings: () => undefined,
    hasApiKey: false,
    isOpenModal: false,
    toggleSettingsModal: () => undefined,
});

export const AiConfigProvider = ({ children }: PropsWithChildren) => {
    const initialSettings = useSessionStorage('aiSettings', defaultSettings);
    const [aiSettings, setAiSettings] = useState<OpenAIConfig>(initialSettings);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    useEffect(() => {
        sessionStorage.setItem('aiSettings', JSON.stringify(aiSettings));
    }, [aiSettings]);

    const toggleSettingsModal = () => setIsOpenModal((prev) => !prev);
    const hasApiKey = Boolean(aiSettings.apiKey);

    return (
        <AiConfigContext.Provider
            value={{
                aiSettings,
                setAiSettings,
                hasApiKey,
                isOpenModal,
                toggleSettingsModal,
            }}
        >
            {children}
        </AiConfigContext.Provider>
    );
};

export const useAiContext = () => {
    const context = useContext(AiConfigContext);
    if (!context) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
};
