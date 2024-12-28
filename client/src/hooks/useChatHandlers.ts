import { useState } from 'react';
import { aiService } from '../services/openAI';
import { AiMessages, ChatMessages } from '../interfaces/message.interface';
import { AI } from '../constants/instructions';

type useChatProps = {
    setSourceCode: (sourceCode: string) => void;
    setCurrentTab: (tab: string) => void;
};

const apiContext: AiMessages = AI.API_INITIAL_STATE;

export const useChatHandlers = ({ setSourceCode, setCurrentTab }: useChatProps) => {
    const [chatMessages, setChatMessages] = useState<ChatMessages>(AI.CHAT_INITIAL_STATE);
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

            if (typeof prompt !== 'string') throw new Error('Invalid prompt');

            setChatMessages((prev) => [
                ...prev,
                {
                    id: prev.length,
                    role: 'user',
                    message: prompt,
                },
            ]);

            apiContext.push({ role: 'user', content: `${prompt}` });

            // -----------------------------------------------------------
            // The service without streaming the data
            // -----------------------------------------------------------

            // const response = await aiService.getCompletions(apiContext);
            // if (response.status !== 200) throw new Error('Request failed with status ' + response.status);
            // const data = response.data;
            // if (!data) throw new Error('No data received');
            // const aiMessage = data.choices[0].message.content;
            // const parsedAiMessage = JSON.parse(aiMessage);
            // setChatMessages((prev) => [
            //     ...prev,
            //     {
            //         id: prev.length,
            //         role: 'bot',
            //         message: parsedAiMessage.answer,
            //     },
            // ]);
            // apiContext.push({ role: 'assistant', content: `${parsedAiMessage.code}` });
            // setSourceCode(parsedAiMessage.code);

            // -----------------------------------------------------------
            // The service that streams the data
            // -----------------------------------------------------------

            const response = await aiService.getSteamData(apiContext, setSourceCode);
            if (!response || response === undefined) throw new Error('Request failed');

            const { data } = response;

            if (!data) throw new Error('No description or code received');

            const destructureData = data.split('\nhtml\n');
            const description = destructureData[0];
            const code = destructureData[1];

            setChatMessages((prev) => [
                ...prev,
                {
                    id: prev.length,
                    role: 'bot',
                    message: description,
                },
            ]);

            apiContext.push({ role: 'assistant', content: code });

            setCurrentTab('PREVIEW');
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
