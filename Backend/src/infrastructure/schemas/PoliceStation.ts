import mongoose from "mongoose";

const PoliceStation = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('PoliceStation', PoliceStation)