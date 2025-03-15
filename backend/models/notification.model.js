import mongoose from "mongoose";

const notidicationSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["follow","like", "unfollow"]
    },
    read:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

const Notification = mongoose.model("Notification",notidicationSchema); 
export default Notification;