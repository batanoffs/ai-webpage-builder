import { FormEvent, useState } from 'react';
import axios from 'axios';

//todo update type of setCode
export const ChatSection = ({ setSourceCode }: any) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event?.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        const { prompt } = Object.fromEntries(form);

        const reqData = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: [
                        {
                            type: 'text',
                            text: `You are a helpful assistant`,
                            //that writes HTML, CSS and JavaScript code for building a webpage. And returns a response which describes briefly what you have done in text and a JSON object with the code split in three sections for JS, html and css
                        },
                    ],
                },
                { role: 'user', content: `${prompt}` },
            ],
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', reqData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                },
            });
            const data = response.data;
            console.log(response);
            console.log(data);
            // setSourceCode((prev: Object) => ({ ...prev, html: prompt.toString() }));

            setMessages((prev: string[]) => [...prev, prompt.toString()]);
            setValue('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="flex sticky flex-col h-[100dvh] w-[50%] border-r-[1px]">
            <div className="h-[5dvh] border-b-[1px] pl-4">
                <h1 className="font-bold">AI Webpage Builder</h1>
            </div>
            <div id="chat" className="flex flex-col gap-4 p-4 h-[90dvh] border-b-[1px] bg-gray-50">
                <p>Hello, how can I help you today?</p>
                <p>Hi</p>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>

            <form className="flex h-[5dvh] gap-2 m-4" onSubmit={handleSubmit}>
                <input
                    className="flex-1 p-4 resize-none border rounded-md border-neutral-500"
                    placeholder={'Type your instructions here...'}
                    type="text"
                    name="prompt"
                    draggable={false}
                    onChange={changeHandler}
                    value={value}
                />
                <input
                    className="border-none rounded-md hover:cursor-pointer w-[40px] bg-button-icon bg-no-repeat
                     bg-blue-600 hover:bg-blue-400"
                    type="submit"
                    value={''}
                />
            </form>
        </section>
    );
};
