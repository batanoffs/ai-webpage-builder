import { AI } from '../constants/instructions';
import { AiMessages } from '../interfaces/message.interface';

export const requestData = (messages: AiMessages) => {
    return {
        model: AI.MODEL,
        messages,
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
                        },
                    },
                    additionalProperties: false,
                },
            },
        },
        temperature: 0.4, //lower values like 0.2 will make it more focused and deterministic
        // top_p: 1,
    };
};

export const streamData = (messages: AiMessages) => {
    return {
        model: 'gpt-4o',
        messages,
        stream: true, // for steam request terminated by a data: [DONE] message
        // response_format: {
        //     type: 'json_schema',
        //     json_schema: {
        //         name: 'code_schema',
        //         schema: {
        //             type: 'object',
        //             properties: {
        //                 code: {
        //                     description: 'The code that should be generated in the input',
        //                     type: 'string',
        //                 },
        //                 answer: {
        //                     description: 'The short description for the code',
        //                     type: 'string',
        //                 },
        //             },
        //             additionalProperties: false,
        //         },
        //     },
        // },
        temperature: 0.4, //lower values like 0.2 will make it more focused and deterministic
    };
};
