import { useState } from 'react';

export const PreviewSection = ({ sourceCode }: { sourceCode: string }) => {
    const [currentTab, setCurrentTab] = useState('web-preview');

    const onPreviewTab = () => {
        setCurrentTab('web-preview');
    };

    const onCodeTab = () => {
        setCurrentTab('code-preview');
    };

    return (
        <aside className="h-[100dvh] w-[50%] flex flex-col">
            <div className="flex border-b-[1px]">
                <button onClick={onPreviewTab} className="py-2 px-4 border">
                    <img className="w-4 h-4 inline-block mr-2" src="./src/assets/preview.svg" alt="eye icon" />
                    Preview
                </button>
                <button onClick={onCodeTab} className="py-2 px-4 border">
                    <span>{'< >'}</span> Code
                </button>
            </div>

            {currentTab === 'web-preview' && <iframe className="h-full w-full" id="web-preview" srcDoc={sourceCode} />}

            {currentTab === 'code-preview' && (
                <section id="code-preview">
                    <pre>
                        <code>{`${sourceCode}`}</code>
                    </pre>
                </section>
            )}
        </aside>
    );
};
