/**
 * Generates text based on the user's message using OpenAI's API.
 *
 * @param {string} userMessage - The message from the user to generate a response for.
 * @returns {Promise<any>} The chat completion response from OpenAI or an error if the operation fails.
 * @throws {Error} If the user message is invalid.
 *
 * @example
 * const response = await generateText("Hello, how are you?");
 * console.log(response);
 */

import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
import { chatMessages } from '../utils/instructions';
import EventEmitter from 'events';

export const generateWebsite = async (prompt: string) => {
	try {
		// Create OpenAI instance with API key
		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

		// Push user message to messages array
		const messages = [...chatMessages];
		messages.push({ role: 'user', content: prompt });

		// Get steam completions from OpenAI
		const stream = await openai.beta.chat.completions.stream({
			model: process.env.GPT_MODEL || 'gpt-4o-mini',
			stream: true,
			messages: chatMessages as ChatCompletionMessage[],
			// store: true, // TODO: Do I need to store?
		});

		const emitter = new EventEmitter();

		// Process the stream
		(async () => {
			try {
				for await (const chunk of stream) {
					const content = chunk.choices[0]?.delta?.content || '';
					if (content) {
						emitter.emit('content', content);
					}
				}
				emitter.emit('end');
			} catch (error) {
				emitter.emit('error', error);
			}
		})();

		return emitter;

		// // Listen for content events
		// stream.on('content', (delta, snapshot) => {
		// 	process.stdout.write(delta);

		// 	//TODO check if delta is a string or object
		// 	console.log('delta steams:', delta);
		// });

		// // Or loop through the stream like this:
		// // for await (const chunk of stream) {
		// // 		process.stdout.write(chunk.choices[0]?.delta?.content || '');
		// // }

		// // If want to cancel the stream use abort method:
		// // stream.controller.abort().then(() => console.log('Stream cancelled'));

		// // Get final chat completion
		// const chatCompletion = await stream.finalChatCompletion();

		// console.log(chatCompletion); // {id: "…", choices: […], …}

		// return chatCompletion;
	} catch (error) {
		throw error;
	}
};

export const openAiService = {
	generateWebsite,
};
