import { useState } from 'react';
import { ChatSection } from './components/chat/ChatSection';
import { AppLayout } from './components/layout/AppLayout';
import { PreviewSection } from './components/preview/PreviewSection';

export const App = () => {
    const [sourceCode, setSourceCode] = useState<string>('');

    return (
        <AppLayout>
            <ChatSection setSourceCode={setSourceCode} />
            <PreviewSection sourceCode={sourceCode} />
        </AppLayout>
    );
};
