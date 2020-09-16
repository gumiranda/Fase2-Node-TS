import { adaptRoute } from '@/bin/configuration/adapters/express-route-adapter';
import { Router } from 'express';
import { makeLoginController } from '../factories/controllers/login-factory-controller';
import { makeSignUpController } from '../factories/controllers/signup-factory-controller';
import { auth } from '@/bin/middlewares/auth';

const router = Router();
router.post('/register', adaptRoute(makeSignUpController()));
router.post('/authenticate', adaptRoute(makeLoginController()));
router.put(
  '/completeRegister',
  auth,
  adaptRoute(makeCompleteRegisterController()),
);
export default router;
