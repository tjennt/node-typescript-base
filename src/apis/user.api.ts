import express from "express";

// Import controller
import * as user from '../controllers/user.controller';

// Middleware
import { checkJwt } from "../middleware/auth.middleware";

// Validator
import * as validator from '../validates/user.validate';

const router = express.Router()

/**
 * JWT
 */
// user
router.use(checkJwt)
router.get("/", user.get)
router.post("/", validator.validateUserCreate(), user.create)
router.delete("/delete", user.destroy)

export {router as usersRouter}