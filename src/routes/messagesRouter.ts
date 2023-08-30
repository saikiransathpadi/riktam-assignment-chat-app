import { Router } from 'express';
import { getChatMessages, sendMessage } from '../controller/messageController';
import { authenticatedRouter } from '../middleware/auth';

const messageRouter = Router();

messageRouter.post('/', authenticatedRouter, sendMessage);
messageRouter.get('/chat/:chatId', authenticatedRouter, getChatMessages);

export default messageRouter;
