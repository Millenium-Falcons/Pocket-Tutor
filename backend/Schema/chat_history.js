const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    query:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true
    }
});

const chat=mongoose.model("chat",chatSchema);
module.exports=chat;