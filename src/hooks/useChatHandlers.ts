import { useState } from 'react';
import { aiService } from '../services/openAI';

export const useChatHandlers = ( setSourceCode: any) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        setValue('');

        try {
            const form = new FormData(event.target as HTMLFormElement);
            const { prompt } = Object.fromEntries(form);

            if (typeof prompt !== 'string') throw new Error('Invalid prompt');

            setMessages((messages) => [...messages, prompt]);

            const response = await aiService.getCompletions(prompt);
            if (response.status !== 200) throw new Error('Request failed with status ' + response.status);

            const data = response.data;
            if (!data) throw new Error('No data received');

            const aiMessage = data.choices[0].message.content;
            const parsedData = JSON.parse(aiMessage);

            setMessages((messages) => [...messages, parsedData.answer]);
            setSourceCode(parsedData.code);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    };

    return { value, changeHandler, handleSubmit, messages };
};
