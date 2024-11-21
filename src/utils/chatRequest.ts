import { AI } from '../constants/instructions';

export const requestData = (prompt: string) => {
    return {
        model: AI.MODEL,
        messages: [
            {
                role: 'system',
                content: [
                    {
                        type: 'text',
                        text: AI.SYSTEM_INSTRUCTIONS,
                    },
                ],
            },
            {
                role: 'user',
                content: `${prompt}`,
            },
        ],
        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'code_schema',
                schema: {
                    type: 'object',
                    properties: {
                        code: {
                            description: 'The code that should be generated in the input',
                            type: 'string',
                        },
                        answer: {
                            description: 'The short description for the code',
                            type: 'string',
                        }
                    },
                    additionalProperties: false,
                },
            },
        },
        // temperature: 0.7,
        // max_tokens: 64,
        // top_p: 1,
    };
};
