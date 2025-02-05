import { Request, Response } from 'express';
import { openAiService } from '../service/completions';

const getCompletions = async (req: Request, res: Response): Promise<void> => {
	try {
		const prompt = req.query.prompt as string;
		const settingsStr = req.query.settings as string;

		if (!prompt) {
			res.status(400).json({ error: 'Prompt is missing!' });
			return;
		}

		if (!settingsStr) {
			res.status(400).json({ error: 'AI settings are missing!' });
			return;
		}

		let settings;
		try {
			settings = JSON.parse(settingsStr);
		} catch (e) {
			res.status(400).json({ error: 'Invalid AI settings format!' });
			return;
		}

// Set SSE headers
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

// Handle client disconnect
req.on('close', () => {
    res.end();
});

try {
    await openAiService.generateWebsite(prompt, settings, (data) => {
        if (data.error) {
            res.write(`data: ${JSON.stringify({ error: data.error })}\n\n`);
            return;
        }
        res.write(`data: ${JSON.stringify({ content: data })}\n\n`);
    });

    // Send complete event
    res.write(`event: complete\ndata: {}\n\n`);
    res.end();
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.end();
}
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
}
};

export { getCompletions };
