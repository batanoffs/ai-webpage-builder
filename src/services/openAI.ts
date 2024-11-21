import { requestData, streamData } from '../utils/chatRequest';
import { API } from '../constants/api';
import { AiMessages } from '../interfaces/message.interface';
import axios from 'axios';

const getCompletions = async (messages: AiMessages) => {
    const response = await axios.post(API, requestData(messages), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
    });

    return response;
};

// Here I am using fetch because it happens that axios does not support streams in the client side
const getSteamData = async (
    messages: AiMessages,
    setSourceCode: (sourceCode: string) => void
): Promise<{ data: string } | void> => {
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify(streamData(messages)),
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            return;
        }

        if (!response.body) {
            throw new Error('No data received');
        }

        setSourceCode(''); // Clear any existing content

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedCode = ''; // To store the final code
        let description = ''; // To store the description
        let isParsingCode = false; // State to track whether we are inside the code block
        let buffer = ''; // Buffer for handling split lines

        while (true) {
            const result = await reader.read();
            if (result.done) {
                break;
            }
            if (result.value) {
                const chunk = decoder.decode(result.value);
                const lines = chunk.split('\n');

                for (let line of lines) {
                    line = buffer + line; // Prepend any buffered partial line
                    buffer = ''; // Clear buffer after using

                    // Skip if the line is empty or marks the end
                    if (line.trim() === '' || line.trim() === '[DONE]') continue;

                    // Handle split JSON or incomplete lines
                    try {
                        const parsedLine = JSON.parse(line.replace(/^data: /, '').trim());
                        const { delta } = parsedLine.choices[0];

                        if (delta && delta.content) {
                            const chunkContent = delta.content;

                            // Update code parsing state based on chunk content
                            if (chunkContent.trim() === '```html') {
                                isParsingCode = true; // Entering a code block
                                continue; // Skip this chunk (it only marks the start)
                            } else if (chunkContent.trim() === '```') {
                                isParsingCode = false; // Exiting a code block
                                continue; // Skip this chunk (it only marks the end)
                            }

                            // Append content based on whether we're inside the code block
                            if (isParsingCode) {
                                accumulatedCode += chunkContent;
                            } else {
                                description += chunkContent;
                                setSourceCode((prev) => prev + chunkContent); // Stream the code visually
                            }
                        }
                    } catch (error) {
                        if (error instanceof SyntaxError) {
                            // If JSON parsing fails, buffer the incomplete line for the next chunk
                            buffer = line;
                        } else {
                            console.error(`Error processing line: ${error.message}. Line: ${line}`);
                        }
                    }
                }
            }
        }

        // Return the final accumulated description and code
        return { data: description.trim() };
    } catch (error) {
        console.error('Error in getSteamData:', error);
    }
};

export const aiService = {
    getCompletions,
    getSteamData,
};
