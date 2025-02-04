import { ReactNode } from 'react';

export const WebPreview = ({ sourceCode }: { sourceCode: string }): ReactNode => {
    return <iframe className="h-full w-full" id="web-preview" srcDoc={sourceCode} />;
};
