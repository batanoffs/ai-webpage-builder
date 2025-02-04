import { ReactNode } from 'react';

type AppLayoutProps = {
    headerLeft: ReactNode;
    headerRight: ReactNode;
    chat: ReactNode;
    preview: ReactNode;
};

export const AppLayout = ({ headerLeft, headerRight, chat, preview }: AppLayoutProps) => {
    return (
        <main className="flex flex-col h-[100dvh] max-h-[100dvh] w-full">
            <header className="flex border-b">
                <div className="w-1/2 border-r">{headerLeft}</div>
                <div className="w-1/2">{headerRight}</div>
            </header>
            <section className="flex flex-1 w-full bg-white">
                <aside className="w-1/2 overflow-hidden">{chat}</aside>
                <aside className="w-1/2 overflow-hidden">{preview}</aside>
            </section>
        </main>
    );
};
