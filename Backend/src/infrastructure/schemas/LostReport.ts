import mongoose from "mongoose";
import LostCounter from "./LostCounter";

const LostReportSchema = new mongoose.Schema({
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
    dateOfLost: {
        type: Date,
        required: true,
        format: 'yyyy-MM-dd'
    },
    timeOfLost: {
        type: String,
        required: true,
        format: 'HH:mm:ss'
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
        enum: ['LOST', 'FOUND', 'IMFORMED', 'COLLECTED', 'REMOVED', 'NOT COLLECTED'],
        default: 'LOST'
    },
    referanceNo: {
        type: String,
        readonly: true,
        required: true,
        unique: true,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        format: 'HH:mm:ss'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        format: 'HH:mm:ss'
    }

})

/*LostReportSchema.pre('save', async function (next) {
    const report = this;
    try {
        if (report.isNew) {
            const counter = await LostCounter.findByIdAndUpdate(
                'lost_report_counter',
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            )
            report.referanceNo = `LRSL-${counter.seq}`;
        }
        next();
    } catch (error) {
        console.log(error);
    }
})
*/

export default mongoose.model('LostReport', LostReportSchema)