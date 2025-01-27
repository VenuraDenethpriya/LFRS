import mongoose from "mongoose";
import FoundCounter from "./FoundCounter";

const FoundReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    items: {
        type: [String],
        required: true
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String]
    },
    dateOfFound: {
        type: Date,
        required: true
    },
    timeOfFound: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distric: {
        type: String,
        required: true
    },
    nearestPoliceStation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['FOUND', 'IMFORMED', 'COLLECTED', 'REMOVED', 'NOT COLLECTED'],
        default: 'FOUND'
    },
    referanceNo: {
        type: String,
        required: true,
        unique: true,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

FoundReportSchema.pre('save', async function (next) {
    const report = this;

    try {
        if (report.isNew) {
            const counter = await FoundCounter.findByIdAndUpdate(
                'found_report_id',
                { $inc: { seq: 1 } },
                { new: true, upsert: true }

            )
            report.referanceNo = `FR-${counter.seq}`;
        }
        next();

    } catch (error) {
        console.log(error)
    }


})

const FoundReport = mongoose.model('FoundReport', FoundReportSchema);
export default FoundReport;