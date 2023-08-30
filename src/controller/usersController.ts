import { Request, Response } from 'express';
import { createUserDb, getUserByEmail, searchUsersDb, updateUserByQueryDb } from '../db/dal/usersDal';
import { generateJwtToken } from '../middleware/auth';
import { comparePassword } from '../middleware/security';
import { isEmpty } from 'lodash';
import { BlacklistToken } from '../models/auth';

export const getChats = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        return res.status(200).json({
            result: [],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: [],
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        if (await getUserByEmail(req.body.email)) {
            throw new Error('User already exists, Please Login');
        }
        const dbResp = await createUserDb(req.body);

        return res.status(200).json({
            result: {
                name: dbResp.name,
                email: dbResp.email,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const userData: any = await getUserByEmail(req.body.email);
        if (!userData) {
            throw new Error("User doesn't exist, please signUp");
        }
        if (!comparePassword(req.body.password, userData?.password)) {
            throw new Error('Incorrect Password');
        }
        return res.status(200).json({
            result: {
                token: await generateJwtToken({ email: userData.email, id: userData._id }),
                email: userData.email,
                name: userData.name,
                profilePic: userData.profilePic,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const users = await searchUsersDb(query, res.locals.user);
        return res.status(200).json({
            result: {
                users,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const email: any = res.locals?.user?.email;
        const user = await getUserByEmail(email);
        return res.status(200).json({
            result: {
                user,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.user_id;
        if (isEmpty(req.body)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid request',
            });
        }
        await updateUserByQueryDb(req.body, { id: userId });

        return res.status(200).json({
            result: null,
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const userLogout = async (req: Request, res: Response) => {
    try {
        const token = req.header('Authorization');
        if (token) {
            try {
                const newBlacklistToken = new BlacklistToken({ token });
                await newBlacklistToken.save();
            } catch (error) {
                console.error('Error adding token to blacklist:', error);
            }
        } else {
            return res.status(400).json({
                message: 'Token not provided',
            });
        }
        return res.status(200).json({
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};
