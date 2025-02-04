import { CodePreview, WebPreview } from './components';
import { OutputViewsType, PreviewSectionProps } from './interfaces';

const OutputViews: OutputViewsType = {
    PREVIEW: WebPreview,
    CODE: CodePreview,
};

export const PreviewSection = ({ sourceCode, currentTab }: PreviewSectionProps) => {
    const CurrentView = OutputViews[currentTab] ?? WebPreview;

    return (
        <aside className="h-full w-full flex flex-col bg-white">
            <CurrentView sourceCode={sourceCode} />
        </aside>
    );
};
