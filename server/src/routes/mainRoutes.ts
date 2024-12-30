import { Router } from 'express';
import completionsRoutes from './completions';

const router = Router();

router.use('/completions', completionsRoutes);

export default router;
