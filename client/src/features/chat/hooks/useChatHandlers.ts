import { useState } from 'react';

import { aiService } from '../services/openAI';
import { ChatMessages } from '../interfaces/message.interface';
import { initialChatMessage } from '../constants/chat';

type useChatProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const useChatHandlers = ({ setSourceCode, setCurrentTab }: useChatProps) => {
    const [chatMessages, setChatMessages] = useState<ChatMessages>([initialChatMessage]);
    const [value, setValue] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        setValue('');
        setCurrentTab('CODE');

        try {
            // Create new FormData object from the form
            const form = new FormData(event.target as HTMLFormElement);

            // Get the prompt value from the form
            const { prompt } = Object.fromEntries(form);

            // Check if the prompt is valid string
            if (!prompt || typeof prompt !== 'string') throw new Error('Invalid prompt');

            // Call the AI service to get the response from open ai
            const response = await aiService.getSteamData(prompt);

            // Check if the response is valid
            if (!response || response === undefined) throw new Error('Request failed');

            // Add the prompt to the chat messages list
            setChatMessages((prev) => [...prev, prompt]);

            console.log(response);

            // const { data } = response;

            // if (!data) throw new Error('No description or code received');

            //TODO decide how to save or validate this data
            // setSourceCode(data);

            // setCurrentTab('PREVIEW');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    };

    return { value, changeHandler, handleSubmit, chatMessages };
};
