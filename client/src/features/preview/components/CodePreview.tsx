import { ReactNode } from 'react';

export const CodePreview = ({ sourceCode }: { sourceCode: string }): ReactNode => {
    return (
        <section className="pl-4 pt-10 overflow-y-scroll small-scrollbar w-full">
            <pre className="whitespace-pre-wrap break-words">
                <code>{`${sourceCode}`}</code>
            </pre>
        </section>
    );
};
