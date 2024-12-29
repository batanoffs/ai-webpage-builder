import { useState } from 'react';
import { aiService } from '../../services/openAI';
import { ChatMessages } from '../../interfaces/message.interface';
import { initialChatMessage } from '../../utils/chat';

type useChatProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: string) => void;
};

//TODO update types 

export const useChatHandlers = ({ setSourceCode, setCurrentTab }: useChatProps) => {
    const [chatMessages, setChatMessages] = useState<ChatMessages>([initialChatMessage]);
    const [value, setValue] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        setValue('');
        setCurrentTab('CODE');

        try {
            const form = new FormData(event.target as HTMLFormElement);
            const { prompt } = Object.fromEntries(form);

            if (!prompt || typeof prompt !== 'string') throw new Error('Invalid prompt');

            const response = await aiService.getSteamData(prompt);

            if (!response || response === undefined) throw new Error('Request failed');

            const { data } = response;

            if (!data) throw new Error('No description or code received');

            setCurrentTab('PREVIEW');

            return { data };
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
