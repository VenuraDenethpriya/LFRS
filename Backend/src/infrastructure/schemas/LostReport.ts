import mongoose from "mongoose";


const generateReferenceNo = () => {
    const min = 100000; // 6 digits min
    const max = 99999999; // 8 digits max
    const randomNum = Math.floor(min + Math.random() * (max - min));
    return `LR-${randomNum}`;
};

const LostReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    items: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
        //type: [mongoose.Schema.Types.ObjectId],
        //ref: 'Category'
    },
    description: {
        type: String
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
    district: {
        type: String,
        required: true
    },
    nearestPoliceStation: {
        type: String,
        //type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['LOST', 'FOUND', 'IMFORMED', 'COLLECTED', 'REMOVED', 'NOT COLLECTED'],
        default: 'LOST'
    },
    referanceNo: {
        type: String,
        require: true,
        unique: true,
        default: generateReferenceNo
    },
    createBy: {
        type: String,
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

export default mongoose.model('LostReport', LostReportSchema)



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