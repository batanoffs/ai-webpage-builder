import { useState } from 'react';

type PreviewSectionProps = {
    sourceCode: {
        html: string;
        css: string;
        js: string;
    };
};

export const PreviewSection = ({ sourceCode }: PreviewSectionProps) => {
    const [currentTab, setCurrentTab] = useState('web-preview');

    const onPreviewTab = () => {
        setCurrentTab('web-preview');
    };

    const onCodeTab = () => {
        setCurrentTab('code-preview');
    };

    const code = `
    <html>
      <head>
        <style>${sourceCode.css}</style>
      </head>
      <body>
        ${sourceCode.html}
        <script>${sourceCode.js}</script>
      </body>
    </html>
    `;

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

            {currentTab === 'web-preview' && <iframe className="h-auto w-full" id="web-preview" srcDoc={code} />}

            {currentTab === 'code-preview' && (
                <section id="code-preview">
                    <pre>
                        <code>{code}</code>
                    </pre>
                </section>
            )}
        </aside>
    );
};
