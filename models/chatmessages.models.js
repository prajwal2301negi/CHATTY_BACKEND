import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    message:{
        type:String,
    },
},{
    timestamps:true
});

const chatMessage = new mongoose.model('ChatMessage',chatMessageSchema);
export default chatMessage;