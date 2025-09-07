import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    videoUrl: {
        type: String,
        // required: true,
    },
    thumbnailUrl: {
        type: String,
        // required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        // required: true,
    },
    category: {
        type: String,
        enum: ['Education', 'Music', 'Entertainment', 'Tech', 'Lifestyle'], // Example categories
    },
    tags: {
        type: [String], // Array of tags
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Reference to a Comment model
    }],

}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);