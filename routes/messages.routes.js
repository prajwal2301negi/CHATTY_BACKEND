import express from 'express';
import { createMessage,  getMessages } from '../controllers/messages.controllers.js';

const router = express.Router();


router.post('/createMessage',createMessage);
router.get('/getMessages',getMessages);
// router.delete('/deleteMessages',deleteChat);




export default router;