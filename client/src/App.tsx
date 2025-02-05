import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { ChatSection, AppLayout, PreviewSection, SettingsMenu } from './features';
import { AiConfigProvider, toastOptions } from './shared';

export const App = () => {
    const [currentTab, setCurrentTab] = useState<'PREVIEW' | 'CODE'>('PREVIEW');
    const [sourceCode, setSourceCode] = useState<string>('');

    return (
        <AiConfigProvider>
            <AppLayout
                chat={<ChatSection setSourceCode={setSourceCode} setCurrentTab={setCurrentTab} />}
                preview={<PreviewSection sourceCode={sourceCode} currentTab={currentTab} />}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
            />

            <SettingsMenu />

            <Toaster position="top-right" toastOptions={{ ...toastOptions }} />
        </AiConfigProvider>
    );
};
