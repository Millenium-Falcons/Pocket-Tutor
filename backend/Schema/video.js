const mongoose=require("mongoose");

const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    author:{
        type:String,
        required:true
    }
});

const video=mongoose.model("Video_Resources",videoSchema);
module.exports=video;