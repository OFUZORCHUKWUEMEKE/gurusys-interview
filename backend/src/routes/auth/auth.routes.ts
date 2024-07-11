import express from 'express';
import { login, SignUp } from '../../controllers/auth/auth';


const router = express.Router();

router.post('/register', SignUp);
router.post('/login', login);

export default router;