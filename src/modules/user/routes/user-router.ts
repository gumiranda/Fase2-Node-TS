import { adaptRoute } from '@/bin/configuration/adapters/express-route-adapter';
import { Router } from 'express';
import { makeSignUpController } from '../factories/controllers/signup-factory-controller';

const router = Router();
router.post('/register', adaptRoute(makeSignUpController()));

export default router;
