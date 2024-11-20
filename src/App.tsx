import { ChatSection } from './components/chat/ChatSection';
import { AppLayout } from './components/layout/AppLayout';
import { PreviewSection } from './components/preview/PreviewSection';

function App() {
    return (
        <AppLayout>
            <ChatSection />
            <PreviewSection />
        </AppLayout>
    );
}

export default App;
