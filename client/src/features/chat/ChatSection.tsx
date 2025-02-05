import { useState } from 'react';

import { useChatHandlers } from './hooks';
import { ChatMessage } from './interfaces';
import { Loading, ChatForm, Message } from './components';
import { useAiContext } from '../../shared';

type ChatSectionProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const ChatSection = ({ setSourceCode, setCurrentTab }: ChatSectionProps) => {
    const [isThinking, setIsThinking] = useState(false);

    const { aiSettings, hasApiKey, toggleSettingsModal } = useAiContext();
    const { chatMessages, value, changeHandler, handleSubmit } = useChatHandlers({
        setSourceCode,
        setCurrentTab,
        aiSettings,
    });

    const handlePromptSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!hasApiKey) {
            toggleSettingsModal();
            return;
        }
        setIsThinking(true);
        try {
            await handleSubmit(event);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <section className="flex flex-col h-full w-full border-r relative overflow-hidden">
            <div className="flex-1 flex flex-col gap-3 p-4 bg-gray-50 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {chatMessages.map((message: ChatMessage, index: number) => (
                    <Message key={message.content + index} message={message} index={index} />
                ))}
            </div>

            <ChatForm handlePromptSubmit={handlePromptSubmit} changeHandler={changeHandler} value={value} />
            {isThinking && <Loading />}
        </section>
    );
};
