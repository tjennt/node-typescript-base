import express from "express";

// Import apis
import * as auth from '../controllers/auth.controller';

// Middleware
import { checkJwt } from "../middleware/auth.middleware";

// Validator
import * as validator from '../validates/auth.validate';

const router = express.Router();

// auth
router.post("/register", auth.register);
router.post("/login", validator.validateAuthLogin(), auth.login);

/**
 * JWT
 */
router.use(checkJwt);

// user
router.post("/logout", auth.logout);

export {router as authRouter};