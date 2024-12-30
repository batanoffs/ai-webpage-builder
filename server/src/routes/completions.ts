import { Router } from 'express';

import { getCompletions } from '../controllers/completions';

const router = Router();

router.post('/', getCompletions);

export default router;
