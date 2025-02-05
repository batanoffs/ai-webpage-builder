/**
 * Generates website code based on the user's message using OpenAI's API.
 *
 * @param {string} prompt - The message from the user to generate a response for.
 * @returns {Promise<GenerationResponse>} Object containing explanation and code.
 * @throws {Error} If the API request fails or response is invalid.
 */

import OpenAI from 'openai';

import { ChatCompletionMessage } from 'openai/resources';
import { chatMessages } from '../constants/instructions';

interface GenerationResponse {
    explanation: string;
    code: string;
    error?: string;
}

interface aiSettings {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens?: number;
}

export const generateWebsite = async (
    prompt: string,
    aiSettings: aiSettings,
    onProgress: (data: Partial<GenerationResponse>) => void
): Promise<void> => {
    try {
        const { apiKey, model, temperature, maxTokens } = aiSettings;

        // Validate configuration
        if (!apiKey || !model || !temperature) {
            throw new Error('Unable to config the AI service.');
        }

        // Create OpenAI instance with error handling
        let openai: OpenAI;
        try {
            openai = new OpenAI({ apiKey: apiKey });
        } catch (err) {
            throw new Error(
                'There was an issue connecting to the AI service. Please try again later.'
            );
        }

        // Prepare messages array with user prompt
        const messages = [...chatMessages, { role: 'user', content: prompt }];

        // Get stream completions from OpenAI
        const stream = await openai.chat.completions.create({
            model: model,
            messages: messages as ChatCompletionMessage[],
            stream: true,
            temperature: temperature,
            max_tokens: maxTokens || 150,
        });

        let currentContent = {
            explanation: '',
            code: '',
            isCollectingCode: false,
        };

        // Process each chunk from the stream
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            
            if (!content) continue;

            // Check for code block markers
            if (content.includes('```html')) {
                currentContent.isCollectingCode = true;
                continue;
            }
            
            if (content.includes('```') && currentContent.isCollectingCode) {
                currentContent.isCollectingCode = false;
                continue;
            }

            // Update appropriate content type and send progress
            if (currentContent.isCollectingCode) {
                currentContent.code += content;
                onProgress({ code: currentContent.code });
            } else {
                currentContent.explanation += content;
                onProgress({ explanation: currentContent.explanation });
            }
        }

        // Final update with complete content
        onProgress({
            explanation: currentContent.explanation,
            code: currentContent.code
        });
    } catch (error) {
        // Pass through OpenAI API errors with full details
        if (error instanceof OpenAI.APIError) {
            // Format error message with URL as clickable link
            let errorMessage = error.message;
            if (error.status === 401 && error.message.includes('https://platform.openai.com/account/api-keys')) {
                errorMessage = error.message.replace(
                    'https://platform.openai.com/account/api-keys',
                    '<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">https://platform.openai.com/account/api-keys</a>'
                );
            }
            throw new Error(errorMessage);
        }

        // Handle validation errors
        if (error instanceof Error) {
            throw error;
        }

        // Handle unknown errors
        throw new Error(JSON.stringify({
            message: 'An unexpected error occurred',
            type: 'UnknownError'
        }));
    }
};

export const openAiService = {
    generateWebsite,
};
