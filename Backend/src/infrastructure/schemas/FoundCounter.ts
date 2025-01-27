import mongoose from "mongoose";

const FoundCounterSchema = new mongoose.Schema({
    seq: {
        type: Number,
        required: true
    }
})

const FoundCounter = mongoose.model('FoundCounter', FoundCounterSchema);
export default FoundCounter;