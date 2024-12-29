import OpenAI from 'openai';
import { aiConfig } from '../utils/instructions';

export const generateText = async (userMessage: string) => {
	try {
		if (!userMessage || typeof userMessage !== 'string')
			throw new Error('Invalid user message');
		// Create messages array
		const messages = [];

		// Add system and assistant messages to messages array
		messages.push(aiConfig.system, aiConfig.assistant, {
			role: 'user',
			content: userMessage,
		});

		// Create OpenAI instance with API key
		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

		// Get steam completions from OpenAI
		const stream = await openai.beta.chat.completions.stream({
			model: aiConfig.model,
			// store: true, // TODO: Do i need to store?
			stream: true,
			messages, //TODO: Check why it needs user prop
		});

		// Listen for content events
		stream.on('content', (delta, snapshot) => {
			process.stdout.write(delta);
		});
		// or, equivalently:
		// for await (const chunk of stream) {
		// 		process.stdout.write(chunk.choices[0]?.delta?.content || '');
		// }
		// cancel the stream stream.controller.abort().then(() => console.log('Stream cancelled'));

		// Get final chat completion
		const chatCompletion = await stream.finalChatCompletion();

		console.log(chatCompletion); // {id: "…", choices: […], …}

		return chatCompletion;
	} catch (error) {
		return error;
	}
};

export const openAiService = {
	generateText,
};
