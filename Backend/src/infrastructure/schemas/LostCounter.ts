import mongoose from "mongoose";

const LostCounterSchema = new mongoose.Schema({
    seq: {
        type: Number,
        required: true
    }
});

const LostCounter = mongoose.model("LostCounter", LostCounterSchema);

export default LostCounter;