export type OutputViewsType = {
    [key: string]: React.FC<{ sourceCode: string }>;
};

export type PreviewSectionProps = {
    sourceCode: string;
    currentTab: string;
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};
