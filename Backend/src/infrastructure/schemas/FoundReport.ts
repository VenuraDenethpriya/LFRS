import mongoose from "mongoose";

const generateReferenceNo = () => {
    const min = 100000; // 6 digits min
    const max = 99999999; // 8 digits max
    const randomNum = Math.floor(min + Math.random() * (max - min));
    return `FR-${randomNum}`;
};

const FoundReportSchema = new mongoose.Schema({
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
        //ref: 'Category',
        //required: true
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
        required: true,
        format: 'yyyy-MM-dd'

    },
    timeOfFound: {
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
        enum: ['FOUND', 'IMFORMED', 'CLAIMED', 'REMOVED', 'NOT COLLECTED'],
        default: 'FOUND'
    },
    referanceNo: {
        type: String,
        require: true,
        unique: true,
        default: generateReferenceNo
    },
    createBy: {
        type: String
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'User',
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
});

/*FoundReportSchema.pre('save', async function (next) {
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
*/
export default mongoose.model('FoundReport', FoundReportSchema);




/* ✅ Generate Random Reference Number Before Saving
FoundReportSchema.pre('save', async function (next) {
    if (this.isNew) {
        // Get current date in YYYYMMDD format
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        // Generate a random 6-digit number
        const randomPart = Math.floor(100000 + Math.random() * 900000);

        // Combine to form the reference number (e.g., FR-20250130-123456)
        this.referanceNo = `FR-${datePart}-${randomPart}`;
    }
    next();
});
*/