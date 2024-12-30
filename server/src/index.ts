import express from 'express';
import routeConfig from './config/routes';
import bodyParser from 'body-parser';
// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

try {
	// Set up the express app to parse JSON
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// Config the routes
	routeConfig(app);

	// Start the Express server
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
} catch (error) {
	console.error(error);
}
