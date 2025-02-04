import { useState } from 'react';
import { ChatSection, AppLayout, PreviewSection } from './features';
import { ChatHeader, Navigation } from './features/layout/components';

export const App = () => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<'PREVIEW' | 'CODE'>('PREVIEW');

    return (
        <AppLayout
            headerLeft={<ChatHeader />}
            headerRight={<Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />}
            chat={<ChatSection setSourceCode={setSourceCode} setCurrentTab={setCurrentTab} />}
            preview={<PreviewSection sourceCode={sourceCode} currentTab={currentTab} />}
        />
    );
};
