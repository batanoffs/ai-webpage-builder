import React, { useState, useRef, useEffect } from 'react';
import toast, { Toast, ToastOptions } from 'react-hot-toast';
import DOMPurify from 'dompurify';

import { llmService } from '../services/steamService';
import { toastOptions } from '../../../shared';
import { ChatMessages } from '../interfaces/message.interface';
import { initialChatMessage } from '../constants/chat';
import { OpenAIConfig } from '../../../shared/types/aiSettings.type';

interface CustomToastOptions extends Partial<ToastOptions> {
    duration?: number;
    style?: React.CSSProperties;
}

type useChatProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
    aiSettings: OpenAIConfig;
};

export const useChatHandlers = ({ setSourceCode, setCurrentTab, aiSettings }: useChatProps) => {
    const [chatMessages, setChatMessages] = useState<ChatMessages>([initialChatMessage]);
    const [value, setValue] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const cleanupRef = useRef<(() => void) | null>(null);
    const toastId = useRef<string>();

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
            if (toastId.current) {
                toast.dismiss(toastId.current);
            }
        };
    }, []);

    const showErrorToast = (errorMessage: string): void => {
        // Clear any existing toast
        if (toastId.current) {
            toast.dismiss(toastId.current);
        }

        const renderToast = (t: Toast) => {
            return React.createElement('div', {
                onClick: () => toast.dismiss(t.id),
                style: { cursor: 'pointer' },
                dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(errorMessage) }
            });
        };

        const options: CustomToastOptions = {
            ...toastOptions.error,
            duration: Infinity,
            style: {
                ...toastOptions.error.style,
                cursor: 'pointer'
            }
        };

        toastId.current = toast.error(renderToast, options);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        setValue('');
        setCurrentTab('CODE');

        try {
            const form = new FormData(event.target as HTMLFormElement);
            const { prompt } = Object.fromEntries(form);

            if (!prompt || typeof prompt !== 'string') {
                throw new Error('Invalid prompt');
            }

            // Clean up previous stream if exists
            if (cleanupRef.current) {
                cleanupRef.current();
            }

            // Add user message
            setChatMessages(prev => [...prev, { role: 'user', content: prompt }]);

            // Initialize assistant message
            setChatMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            // Track current response
            let currentExplanation = '';
            let currentCode = '';

            // Start streaming
            cleanupRef.current = llmService.getStreamData(
                prompt,
                aiSettings,
                (data) => {
                    if (data.explanation) {
                        currentExplanation += data.explanation;
                        setChatMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1].content = currentExplanation;
                            return newMessages;
                        });
                    }
                    if (data.code) {
                        currentCode += data.code;
                        setSourceCode(currentCode);
                        setCurrentTab('PREVIEW');
                    }
                },
                (error: Error) => {
                    showErrorToast(error.message);
                    throw error;
                }
            );
        } catch (error) {
            let errorMessage = "An unexpected error occurred";
            
            if (error instanceof Error) {
                try {
                    // Check if the error message is JSON (for backward compatibility)
                    const parsed = JSON.parse(error.message);
                    errorMessage = parsed.message;
                } catch {
                    // If not JSON, use the message directly since it's already formatted
                    errorMessage = error.message;
                }
            }

            showErrorToast(errorMessage);

            // Add error message to chat with error styling
            setChatMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: errorMessage,
                    isError: true,
                };
                return newMessages;
            });
        }
    };

    return { value, changeHandler, handleSubmit, chatMessages };
};
