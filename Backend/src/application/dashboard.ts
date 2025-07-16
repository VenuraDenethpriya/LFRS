import { Request, Response, NextFunction } from "express";
import LostReport from "../infrastructure/schemas/LostReport";
import FoundReport from "../infrastructure/schemas/FoundReport";
import Category from "../infrastructure/schemas/Category";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const LostFoundReportTotal = await LostReport.countDocuments({ status: 'FOUND' });
        const InformedReportTotal = await LostReport.countDocuments({ status: 'INFORMED' });
        const CollectedReportTotal = await LostReport.countDocuments({ status: 'COLLECTED' });
        const NotCollectedReportTotal = await LostReport.countDocuments({ status: 'NOT COLLECTED' });
        const RemoveReportTotal = await LostReport.countDocuments({ status: 'REMOVED' });
        const LostReportTotal = await LostReport.countDocuments({ status: 'LOST' });

        const FoundReportTotal = await FoundReport.countDocuments({ status: 'FOUND' });
        const InformedFoundReportTotal = await FoundReport.countDocuments({ status: 'INFORMED' });
        const ClaimedFoundReportTotal = await FoundReport.countDocuments({ status: 'CLAIMED' });
        const RemoveFoundReportTotal = await FoundReport.countDocuments({ status: 'REMOVED' });
        const NotCollectedFoundReportTotal = await FoundReport.countDocuments({ status: 'NOT COLLECTED' });


        const AllLostReportTotal = await LostReport.countDocuments();
        const AllFoundReportTotal = await FoundReport.countDocuments();

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);

        const TotalLostReportForLast3Months = await LostReport.aggregate([
            {
                $match: {
                    dateOfLost: {
                        $gte: startDate,
                        $lte: new Date()
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by date ascending
            },
            {
                $project: {
                    date: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const TotalFoundReportForLast3Months = await FoundReport.aggregate([
            {
                $match: {
                    dateOfFound: {
                        $gte: startDate,
                        $lte: new Date()
                    }
                }
            }, {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$dateOfFound" }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by date ascending
            },
            {
                $project: {
                    date: "$_id",
                    total: 1,
                    _id: 0
                }
            }

        ])

        startDate.setMonth(startDate.getMonth() - 1); // 1 month ago
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(); // Now
        endDate.setHours(23, 59, 59, 999);

        const lostTotal = await LostReport.countDocuments({
            dateOfLost: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalLostReportInMonth = {
            lostTotal,
            startDate,
            endDate
        };
        const foundTotal = await FoundReport.countDocuments({
            dateOfFound: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalFoundReportInMonth = {
            foundTotal,
            startDate,
            endDate
        };
        const TOtalLostREportInEveryMonth = await LostReport.aggregate([
            {
                $match: {
                    dateOfLost: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by date ascending
            },
            {
                $project: {
                    date: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const district = [
            "Colombo", "Gampaha", "Kalutara",
            "Kandy", "Matale", "Nuwara Eliya",
            "Galle", "Matara", "Hambantota",
            "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu",
            "Trincomalee", "Batticaloa", "Ampara",
            "Kurunegala", "Puttalam",
            "Anuradhapura", "Polonnaruwa",
            "Badulla", "Monaragala",
            "Ratnapura", "Kegalle"
        ];

        const TotalLostReportBassedOnDistric = await LostReport.aggregate([
            {
                $match: {
                    district: {
                        $in: district // Make sure 'district' is defined
                    }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$dateOfLost" } },
                        district: "$district"
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.date": 1 }
            },
            {
                $project: {
                    district: "$_id.district",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const TotalFoundReportBassedOnDistric = await FoundReport.aggregate([
            {
                $match: {
                    district: {
                        $in: district
                    }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$dateOfFound" } },
                        district: "$district"
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.date": 1 }
            },
            {
                $project: {
                    district: "$_id.district",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const categories = await Category.find({}, "name").lean();
        const categoryNames = categories.map(cat => cat.name);

        const TotalLostReportByCategory = await LostReport.aggregate([
            {
                $match: {
                   category: { $in: categoryNames }
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    category: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        const TotalFoundReportByCategory = await FoundReport.aggregate([
            {
                $match: {
                    category: { $in: categoryNames }
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    category: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]);



        return res.status(200).json({
            LostFoundReportTotal,
            InformedReportTotal,
            CollectedReportTotal,
            NotCollectedReportTotal,
            RemoveReportTotal,
            LostReportTotal,
            FoundReportTotal,
            InformedFoundReportTotal,
            ClaimedFoundReportTotal,
            RemoveFoundReportTotal,
            NotCollectedFoundReportTotal,
            TotalLostReportForLast3Months,
            TotalFoundReportForLast3Months,
            totalLostReportInMonth,
            totalFoundReportInMonth,
            TOtalLostREportInEveryMonth,
            TotalLostReportBassedOnDistric,
            TotalFoundReportBassedOnDistric,
            TotalLostReportByCategory,
            TotalFoundReportByCategory,
            AllLostReportTotal,
            AllFoundReportTotal
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};