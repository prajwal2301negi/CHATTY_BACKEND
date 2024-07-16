
import ChatMessage from '../models/chatmessages.models.js'

let messages = [];

export const getMessages =  async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 

export const createMessage =  async (req, res) => {
    try {
        const { user, message } = req.body;
 
        if (!user || !message) {
            return res
                .status(400)
                .json({ error: "User and message are required" });
        }
 
        const chatMessage = new ChatMessage({
            user,
            message,
        });
 
        await chatMessage.save();
 
        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// export const deleteChat = async(req,res)=>{
//     const findChat = await ChatMessage.find();
//     if(!findChat){
//         return res.status(404).json({error:"No chat found" });
//     }
//     await findChat.deleteOne({});
//     res.json({message:"Chat deleted successfully" });
// }
