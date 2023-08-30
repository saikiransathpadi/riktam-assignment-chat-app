import { Request, Response } from 'express';
import { getChatMessagesDb, sendMessageDb } from '../db/dal/messageDal';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { content, chatId } = req.body;
        if (!content || !chatId) {
            throw new Error('Invalid Request');
        }
        const resp = await sendMessageDb({
            sender: res.locals?.user?.id,
            content,
            chat: chatId,
        });
        return res.status(200).json({
            result: resp,
        });
    } catch (error: any) {
        return res.status(400).json({
            error,
            message: error.message,
        });
    }
};

export const getChatMessages = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const resp = await getChatMessagesDb(chatId);
        return res.status(200).json({
            result: { messages: resp },
        });
    } catch (error: any) {
        return res.status(400).json({
            error,
            message: error.message,
        });
    }
};
