import { API } from '../constants/api';

interface GenerationResponse {
    explanation: string;
    code: string;
}

type OnProgressCallback = (data: Partial<GenerationResponse>) => void;
type OnErrorCallback = (error: Error) => void;

const getStreamData = (
    prompt: string,
    settings: any,
    onProgress: OnProgressCallback,
    onError: OnErrorCallback
): (() => void) => {
    // Encode both prompt and settings in URL parameters
    const params = new URLSearchParams({
        prompt,
        settings: JSON.stringify(settings),
    });
    const source = new EventSource(`${API.chat}?${params}`);

    let retryCount = 0;
    const maxRetries = 3;

    source.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.content) {
                onProgress(data.content);
                // Reset retry count on successful message
                retryCount = 0;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to process server response';
            onError(new Error(errorMessage));
            source.close();
        }
    };

    source.onerror = () => {
        // Handle reconnection attempts
        if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Attempting to reconnect (${retryCount}/${maxRetries})...`);
            return; // EventSource automatically attempts to reconnect
        }

        source.close();
        onError(new Error('Lost connection to server. Please try again.'));
    };

    source.addEventListener('complete', () => {
        source.close();
    });

    // Additional error handling for connection timeout
    const connectionTimeout = setTimeout(() => {
        if (source.readyState !== source.CLOSED) {
            source.close();
            onError(new Error('Request timed out. Please check your internet connection and try again.'));
        }
    }, 30000); // 30 second timeout

    // Enhanced cleanup function
    return () => {
        clearTimeout(connectionTimeout);
        source.close();
    };
};

export const llmService = {
    getStreamData,
};
