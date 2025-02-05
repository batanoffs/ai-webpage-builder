import { Router } from 'express';

import { getCompletions } from '../controllers/completions';

const router = Router();

router.get('/', getCompletions);

export default router;
