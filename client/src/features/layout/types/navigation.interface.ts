export interface NavigationProps {
    currentTab: 'PREVIEW' | 'CODE';
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
}