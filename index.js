import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
import dotenv from 'dotenv';
import dbConnection from './database/dbConnection.js'

import messageRouter from './routes/messages.routes.js'

dotenv.config();

const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL], // Allow requests from this origin
        methods: ["GET", "POST", "DELETE"],
    }
});

// Use CORS middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL] // Allow requests from this origin
}));



app.use(express.json());


// let messages = [];



// import ChatMessage from './models/chatmessages.models.js'




// app.get("/messages", async (req, res) => {
//     try {
//         const messages = await ChatMessage.find();
//         res.json(messages);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
 

// app.post("/messages", async (req, res) => {
//     try {
//         const { user, message } = req.body;
 
//         if (!user || !message) {
//             return res
//                 .status(400)
//                 .json({ error: "User and message are required" });
//         }
 
//         const chatMessage = new ChatMessage({
//             user,
//             message,
//         });
 
//         await chatMessage.save();
 
//         res.status(201).json(chatMessage);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.use('/api/v1/message',messageRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

dbConnection();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
