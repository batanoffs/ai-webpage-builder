import { Request, Response, NextFunction } from 'express';
import { openAiService } from '../service/completions';

const getCompletions = async (req: Request, res: Response): Promise<void> => {
	try {
		// Get user message from request body
		const { prompt } = req.body;

		// Call the completion service
		const completions = await openAiService.generateWebsite(prompt);

		// Check if completions were found
		if (!completions) res.status(404).json({ message: 'No completions found' });

		// Check if there was an error
		if (completions && completions instanceof Error)
			res.status(500).json({ message: `Error ${completions.message}` });

		// Send the completion back to the client
		res.status(200).json({ completions });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export { getCompletions };
