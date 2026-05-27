import mongoose from "mongoose";

const ConfessionSchema = new mongoose.Schema({
    title: {type: String, required: true, default: "New Confession"},
    topic: String,
    likes: {type : Number, required : false, default: 0},
    date: {type: Date, required: false, default: Date.now }
});

export const Conff = mongoose.model('conff', ConfessionSchema);