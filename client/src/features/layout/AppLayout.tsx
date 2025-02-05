import { ReactNode } from 'react';
import { ChatHeader, Navigation } from './components';

type AppLayoutProps = {
    chat: ReactNode;
    preview: ReactNode;
    currentTab: 'PREVIEW' | 'CODE';
    setCurrentTab: (tab: 'PREVIEW' | 'CODE') => void;
};

export const AppLayout = ({ chat, preview, currentTab, setCurrentTab }: AppLayoutProps) => {
    return (
        <main className="flex flex-col h-[100dvh] max-h-[100dvh] w-full">
            <header className="flex border-b">
                <div className="w-1/2 border-r">
                    <ChatHeader />
                </div>
                <div className="w-1/2">
                    <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </div>
            </header>
            <section className="flex flex-1 w-full bg-white overflow-hidden">
                <aside className="w-1/2">{chat}</aside>
                <aside className="w-1/2">{preview}</aside>
            </section>
        </main>
    );
};
