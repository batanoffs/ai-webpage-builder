import { ReactNode } from 'react';

export const WebPreview = ({ sourceCode }: { sourceCode: string }): ReactNode => {
    return (
        <div className="h-full w-full bg-white">
            <iframe 
                className="h-full w-full border-0" 
                id="web-preview" 
                srcDoc={sourceCode}
                title="Web Preview"
                sandbox="allow-scripts"
                loading="lazy"
            />
        </div>
    );
};
