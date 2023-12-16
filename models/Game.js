import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    title:{
        type: String, required: true
    },
    genre: {
        /* type: String,
        required: true, */
        type: Array,
        default: [],
    },
    type:{
        type: String,
    },
    avatarUrl: String,
    releaseDate: Date,
    developer: String,
    publisher: String,
    localization: String,
    userRating: Number,
    ageRating: String,
    description: String,
    logoUrl: String,
    devices: String,
    series: String
},
{
    timestamps: true
}
)

export default mongoose.model('Game', GameSchema);