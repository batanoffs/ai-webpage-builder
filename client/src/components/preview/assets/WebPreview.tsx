export const WebPreview = ({ sourceCode }: { sourceCode: string }) => {
    return <iframe className="h-full w-full" id="web-preview" srcDoc={sourceCode} />;
};
