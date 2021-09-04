import * as dotenv from "dotenv";
import { Request, Response } from "express";
import * as response from '../common/responses';
// import { User } from '../../users/models';
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

dotenv.config()

if (!process.env.TOKEN_SECRET_KEY ||
    !process.env.TOKEN_EXPIRES_IN
){
    process.exit(1)
}
const TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY
const TOKEN_EXPIRES_IN: string = process.env.TOKEN_EXPIRES_IN

export const register = async (req: Request, res: Response) => {
    return response.success(res, "", "Register successfully")
}

export const login = async (req: Request, res: Response) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      return response.error(res, errors.array(), "", 422);
    }
    const token = await jwt.sign(
        { userName: 'tien' },
        TOKEN_SECRET_KEY,
        { expiresIn: TOKEN_EXPIRES_IN }
    )
    return response.success(res, {token}, "Login successfully")
}

export const logout = async (req: Request, res: Response) => {
    return response.success(res, "", "Logout successfully")
}