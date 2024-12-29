import { Router } from 'express';
import completions from './completions';

const router = Router();

router.use('/completions', completions);

export default router;
