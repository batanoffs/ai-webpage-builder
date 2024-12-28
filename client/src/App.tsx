import { useState } from 'react';
import { ChatSection, AppLayout, PreviewSection } from './components/index';

export const App = () => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [currentTab, setCurrentTab] = useState('PREVIEW');

    return (
        <AppLayout>
            <ChatSection setSourceCode={setSourceCode} setCurrentTab={setCurrentTab} />
            <PreviewSection sourceCode={sourceCode} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </AppLayout>
    );
};
