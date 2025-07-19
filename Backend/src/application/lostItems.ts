import { Response, Request, NextFunction } from "express";
import LostReport from "../infrastructure/schemas/LostReport";
import NotFoundError from "../domain/errors/not-found-error";
import { getAuth } from "@clerk/express";
import { buildLostReportQuery, sendConfirmationEmail, sendSMS, sendStatusUpdateEmail } from "../utils";


export const createLostReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const report = await LostReport.create(req.body);

    if (report) {
      // Send confirmation email if email exists
      if (req.body.email) {
        await sendConfirmationEmail(report.email, report, 'LOST');
      }

      // Send SMS if phoneNo exists
      if (req.body.phoneNo) {
        const message = `Hello ${report.name}, your lost item report (Ref: ${report.referanceNo}) has been created successfully. Thank you!`;
        await sendSMS(req.body.phoneNo, message);
      }

      return res.status(201).json({ message: "You have successfully created a report" });
    }

    return res.status(200).json({ message: 'Something went wrong try again' });
  } catch (error) {
    next(error);
  }
}


export const geTLostReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            referance,
            category,
            location,
            policeStation,
            district,
            date,
            status,
            limit = '10',
            offset = '0',
        } = req.query;

        const query: any = {};

        if (referance) query.referanceNo = { $regex: referance, $options: 'i' };
        if (category) query.category = { $in: [category] };
        if (location) query.location = { $regex: location, $options: 'i' };
        if (policeStation) query.nearestPoliceStation = { $regex: policeStation, $options: 'i' };
        if (district) query.district = { $regex: district, $options: 'i' };

        // --- AUTHENTICATION AND ROLE-BASED ACCESS LOGIC ---
        // const { userId, sessionClaims } = getAuth(req);
        // const role = sessionClaims?.metadata?.role ?? "public"; // Default to "public" if no role metadata

        // console.log("------------------- Backend Debugging Start -------------------");
        // console.log("Incoming Query Params:", req.query);
        // console.log("Authenticated User ID:", userId); // Log the actual userId from Clerk
        // console.log("User Role (from Clerk claims):", role);


        // if (role !== 'admin') {
        //     // If the user is NOT an admin, they can ONLY see their own reports.
        //     // This also handles unauthenticated users (userId will be null).
        //     // A non-existent userId will result in 0 matches, which is desired for unauthenticated.
        //     if (userId) { // Ensure there's an actual userId to filter by
        //         query.createBy = userId;
        //         console.log("Applying non-admin user filter: query.createBy =", userId);
        //     } else {
        //         // If not an admin AND not authenticated, return no data (or handle differently)
        //         console.log("Not an admin and not authenticated. Returning no data.");
        //         return res.status(200).json({ totalCount: 0, data: [] });
        //     }
        // } else {
        //     // If role IS 'admin', no 'createBy' filter is applied. Admins see all.
        //     console.log("Admin user detected. No 'createBy' filter applied.");
        // }

        // console.log("Final Mongoose Query Object:", JSON.stringify(query, null, 2));
        // console.log("Limit:", limit, "Offset:", offset);
        if (date && typeof date === 'string') {
            query.dateOfLost = new Date(date);
        }
        if (status) query.status = { $regex: status, $options: 'i' };

        console.log("Final Query:", query);

        const totalCount = await LostReport.countDocuments(query);
        const reports = await LostReport.find(query)
            .limit(parseInt(limit as string))
            .skip(parseInt(offset as string))
            .populate('category')
            .sort({ updatedAt: -1 });

        console.log("Reports:", reports);
        return res.status(200).json({
            totalCount,
            data: reports
        });
    } catch (err) {
        next(err);
    }
};



export const getLostReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findById(id).populate('category')
        if (!lostReport) {
            throw new NotFoundError("Lost report not found")
        }
        return res.status(200).json(lostReport)

    } catch (error) {
        next(error)
    }
}

export const deleteLostReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const lostReport = await LostReport.findByIdAndDelete(id);
        if (!lostReport) {
            throw new NotFoundError("Lost report not found")
        }
        return res.status(200).send("You have successfully deleted the report")
    } catch (error) {
        next(error)
    }
}

// export const UpdateReport = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id;
//         const lostReport = await LostReport.findByIdAndUpdate(id, req.body)
//         if (!lostReport) {
//             throw new NotFoundError("Lost report not found")
//         }
//         return res.status(200).json(lostReport).send("You have successfully updated the report status")
//     } catch (error) {
//         next(error)
//     }
// }
export const UpdateReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Find existing report first
    const existingReport = await LostReport.findById(id);
    if (!existingReport) throw new NotFoundError("Lost report not found");

    const previousStatus = existingReport.status;
    const updatedReport = await LostReport.findByIdAndUpdate(id, updateData, { new: true });

    // Only proceed if status has changed
    if (
      updatedReport &&
      previousStatus !== updatedReport.status
    ) {
      // Send email if email exists
      if (updatedReport.email) {
        await sendStatusUpdateEmail(
          updatedReport.email,
          updatedReport.name,
          updatedReport.referanceNo,
          updatedReport.status
        );
      }

      // Send SMS if phone number exists
      if (updatedReport.phoneNo) {
        const smsMessage = `Hi ${updatedReport.name}, your lost report (Ref: ${updatedReport.referanceNo}) status has been updated to '${updatedReport.status}'.`;
        await sendSMS(updatedReport.phoneNo, smsMessage);
      }
    }

    return res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
};

export const getLostProductByCategory = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { category } = req.query
        const lostReport = await LostReport.find({ category });
        if (!lostReport) {
            throw new NotFoundError("Lost report not found")
        }
        return res.status(200).json(lostReport).send()
    } catch (error) {
        next(error);
    }
}