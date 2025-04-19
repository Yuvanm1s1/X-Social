import mongoose from "mongoose";
// const postSchema = mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     img:{
//         type:String,
      
//     },
//     likes:[
//         {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
//     ],
//     comments:[{
//         text:{
//             type:String,
//             required:true
//         },
//         user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},

//     }]
// },{
//     timestamps:true
// });

// const Post = mongoose.model('Post',postSchema);
// export default Post;



const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        trim: true // optional but useful to remove leading/trailing spaces
    },
    img: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
export default Post;