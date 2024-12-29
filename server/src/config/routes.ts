import { Router } from 'express';
import mainRoutes from '../routes/mainRoutes';

export default function routeConfig(app: Router): void {
	app.use('/api', mainRoutes);
}
