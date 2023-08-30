import { NextFunction, Request, Response } from 'express';
import { AUTH, RESPONSE_MESSAGES, STATUS_CODES } from '../enums';
import { sign, verify } from 'jsonwebtoken';
import { getUserByEmail } from '../db/dal/usersDal';
import { BlacklistToken } from '../models/auth';
const SECRET: any = process.env.SECRET;

export const authenticatedRouter = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Validation.......');
    try {
        const accessTokenFromClient: string = req.header('Authorization') as any;
        if (!accessTokenFromClient || (await BlacklistToken.findOne({ token: accessTokenFromClient })))
            return res
                .status(STATUS_CODES.UNAUTHORIZED)
                .json({ message: RESPONSE_MESSAGES.UNAUTHORIZED, developer_message: RESPONSE_MESSAGES.TOKEN_MISSING });

        const data: any = verify(accessTokenFromClient, SECRET, { algorithms: [AUTH.TOKEN_ALGORITHM] });
        res.locals.user = data
        await getUserByEmail(data.email);
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: RESPONSE_MESSAGES.UNAUTHORIZED,
            developer_message: error.message,
        });
    }
};

export const generateJwtToken = async (body: { [key: string]: string }): Promise<string> => {
    const token = sign(body, SECRET, { expiresIn: AUTH.TOKEN_EXPIRES_IN, algorithm: AUTH.TOKEN_ALGORITHM });
    return token;
};

export const checkIfAdmin = async (_req: Request, res: Response, next: NextFunction) => {
    console.log('Auth Validation.......');
    try {
        if (res.locals?.user?.role !== 'admin') {
            throw new Error("Only admins can create user")
        }
        next()
    } catch (error: any) {
        console.log(error);
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: RESPONSE_MESSAGES.UNAUTHORIZED,
            developer_message: error.message,
        });
    }
};
