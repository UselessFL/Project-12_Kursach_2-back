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
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Game'/* , default:{} */ }
},
{
    timestamps: true
}
)

export default mongoose.model('Game', GameSchema);