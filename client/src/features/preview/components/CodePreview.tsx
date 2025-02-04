import { ReactNode } from 'react';

export const CodePreview = ({ sourceCode }: { sourceCode: string }): ReactNode => {
    return (
        <section className="p-6 overflow-y-auto w-full bg-gray-50 h-full">
            <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <code className="text-sm font-mono text-gray-800">{sourceCode}</code>
            </pre>
        </section>
    );
};
