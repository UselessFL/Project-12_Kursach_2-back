import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type: String, required: true
    },

    raiting:{
        type: String,
        required: true
    },
    authorId: { type: String, required: true},
    gameId: {type: String, required: true}
},
{
    timestamps: true
}
)

export default mongoose.model('Comment', CommentSchema);