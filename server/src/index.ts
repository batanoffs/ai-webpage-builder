import express from 'express';
import routeConfig from './config/routes';

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

try {
	// Config the routes
	routeConfig(app);

	// Start the Express server
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
} catch (error) {
	console.error(error);
}
