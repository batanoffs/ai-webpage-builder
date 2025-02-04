import { CodePreview, Navigation, WebPreview } from './components';
import { OutputViewsType, PreviewSectionProps } from './interfaces/preview.type';

const OutputViews: OutputViewsType = {
    PREVIEW: WebPreview,
    CODE: CodePreview,
};

export const PreviewSection = ({ sourceCode, currentTab, setCurrentTab }: PreviewSectionProps) => {
    const CurrentView = OutputViews[currentTab] ?? WebPreview;

    return (
        <aside className="h-[100dvh] w-[50%] flex flex-col">
            <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <CurrentView sourceCode={sourceCode} />
        </aside>
    );
};
