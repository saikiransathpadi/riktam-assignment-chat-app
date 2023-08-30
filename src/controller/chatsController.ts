import { Request, Response } from 'express';
import { createGroupChatDb, getOrCreateChat, getUserChatsDb, updateGroupChatDb } from '../db/dal/chatDal';

export const accessChat = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (userId === res.locals?.user?.id) {
            return res.status(400).json({
                message: 'Chat cannot be there for the same user',
            });
        }
        const chatData = await getOrCreateChat(userId, res.locals?.user?.id);
        return res.status(200).json({
            result: {
                chatData,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const getUserChats = async (req: Request, res: Response) => {
    try {
        const userId: any = res.locals?.user?.id;
        const chats = await getUserChatsDb(userId);
        return res.status(200).json({
            result: {
                chats,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const createGroupChat = async (req: Request, res: Response) => {
    try {
        const userId: any = res.locals?.user?.id;
        const { users, chatName } = req.body;
        if (!Array.isArray(users) || !chatName) {
            throw new Error('Users and group name is mandatory');
        }
        if (users.length < 2) {
            throw new Error('Atleast 2 participants are required to create a group');
        }
        const chats = await createGroupChatDb([...users, userId], chatName, userId);
        return res.status(200).json({
            result: {
                chats,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            error,
            message: error.message,
        });
    }
};

export const updateGroupChat = async (req: Request, res: Response) => {
    try {
        const userId: any = res.locals?.user?.id;
        const { addUsers } = req.body;
        if (addUsers && !Array.isArray(addUsers)) {
            throw new Error('Invalid users');
        }
        const chats = await updateGroupChatDb({ ...req.body, chatId: req.params.chatId }, userId);
        if (!chats.modifiedCount) {
            throw new Error('Only Admins can update the group')
        }
        return res.status(200).json({
            result: {
                chats,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            error,
            message: error.message,
        });
    }
};
