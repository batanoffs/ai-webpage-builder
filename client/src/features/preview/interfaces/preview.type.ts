export type OutputViewsType = {
    [key: string]: React.FC<{ sourceCode: string }>;
};

export type PreviewSectionProps = {
    sourceCode: string;
    currentTab: 'PREVIEW' | 'CODE';
    setCurrentTab?: (tab: 'PREVIEW' | 'CODE') => void;
};
