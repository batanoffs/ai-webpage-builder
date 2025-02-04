import { useState } from 'react';
import { ChatSection, AppLayout, PreviewSection } from './features';

export const App = () => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<'PREVIEW' | 'CODE'>('PREVIEW');

    return (
        <AppLayout>
            <ChatSection setSourceCode={setSourceCode} setCurrentTab={setCurrentTab} />
            <PreviewSection sourceCode={sourceCode} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </AppLayout>
    );
};
