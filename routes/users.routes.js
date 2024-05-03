import { Router } from "express";
import { login, logout, profile, register } from "../controllers/users.controller.js";
import { checkUserSession } from "../middlewares/auth.middleware.js";

// Create recipes router
const router = Router();

// Define routes
router.post('/register', register);

router.post('/login', login);

router.get('/profile', checkUserSession, profile);

router.post('/logout', checkUserSession, logout);

// Export router
export default router;