import { Request, Response } from 'express';
import { openAiService } from '../service/completions';

const getCompletions = async (req: Request, res: Response): Promise<void> => {
	try {
		// Get user message from request body
		const { prompt } = req.body;

		if (!prompt) {
			res.status(400).json({ error: 'Message is required' });
			return;
		}

		// Set headers for streaming
		res.setHeader('Content-Type', 'text/event-stream');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		// Call the completion service
		const stream = await openAiService.generateWebsite(prompt) as NodeJS.EventEmitter;

		// Handle stream events
		stream.on('content', (delta: string) => {
			res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
		});

		stream.on('end', () => {
			res.end();
		});

		stream.on('error', (error: Error) => {
			console.error('Stream error:', error);
			res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
			res.end();
		});

		// // Check if completions were found
		// if (!completions) res.status(404).json({ message: 'No completions found' });

		// // Check if there was an error
		// if (completions && completions instanceof Error)
		// 	res.status(500).json({ message: `Error ${completions.message}` });

		// Send the completion back to the client
		// res.status(200).json({ completions });
	} catch (error: unknown) {
		console.error('Completion error:', error);
		res.status(500).json({
			error: error instanceof Error ? error.message : 'Internal server error',
		});
	}
};

export { getCompletions };
