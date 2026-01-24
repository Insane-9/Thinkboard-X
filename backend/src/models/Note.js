import mongoose from "mongoose";

// Create schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,   // Automatically manage createdAt and updatedAt fields            
})

const model = mongoose.model("Note", noteSchema);

export default model;