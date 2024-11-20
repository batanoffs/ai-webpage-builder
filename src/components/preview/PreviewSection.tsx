import { useState } from 'react';

export const PreviewSection = () => {
    const [code, setCode] = useState('');

    const onPreviewTab = (e) => {
        //switch the content to iframe
    };

    const onCodeTab = (e) => {
        //switch the content to display the code for the page
    };

    return (
        <aside className="h-[100dvh] w-[50%] flex flex-col">
            <div className="flex border-b-[1px]">
                <button onClick={() => {}} className="py-2 px-4 border">
                    <img className="w-4 h-4 inline-block mr-2" src="./src/assets/preview.svg" alt="eye icon" />
                    Preview
                </button>
                <button className="py-2 px-4 border">
                    <span>{'< >'}</span> Code
                </button>
            </div>

            <iframe
                srcDoc={`
                    <html>
                        <head>
                            <style>
                                body {
                                    background-color: #eee;
                                }
                                h1 {
                                    text-align: center;
                                }
                            </style>
                        </head>
                        <body>
                            <h1>Example</h1>
                            <p>This is an example of a webpage.</p>
                        </body>
                    </html>
                `}
                className="h-auto w-full"
            />
        </aside>
    );
};
