import { Request, Response, NextFunction } from "express";
import FoundReport from "../infrastructure/schemas/FoundReport";
import NotFoundError from "../domain/errors/not-found-error";
import { getAuth } from "@clerk/express";
import { sendConfirmationEmail, sendSMS, sendStatusUpdateEmail } from "../utils";

export const createFoundReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundReport = await FoundReport.create(req.body)
        if (foundReport) {
            if (req.body.email) {
                await sendConfirmationEmail(foundReport.email, foundReport, 'FOUND');
            }
            // Send SMS if phoneNo exists
          if (req.body.phoneNo) {
            const message = `Hello ${foundReport.name}, your found item report (Ref: ${foundReport.referanceNo}) has been created successfully. Thank you!`;
            await sendSMS(req.body.phoneNo, message);
          }
            return res.status(201).json(foundReport).send();
        }
        return res.status(200).send("Something went wrong");
    } catch (error) {
        next(error);
    }
}

export const getFoundReport = async (req: Request, res: Response, next: NextFunction) => {
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
            query.dateOfFound = new Date(date);
        }
        if (status) query.status = { $regex: status, $options: 'i' };
        console.log("Final Query:", query);

        const totalCount = await FoundReport.countDocuments(query);
        const reports = await FoundReport.find(query)
            .limit(parseInt(limit as string))
            .skip(parseInt(offset as string))
            .populate('category')
            .sort({ createdAt: -1 });
        return res.status(200).json({
            totalCount,
            data: reports,
        }
        );
    } catch (error) {
        next(error);
    }
}

export const getFoundReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findById(id).populate('category')
        if (!foundReport) {
            throw new NotFoundError("Could not find FoundReport")
        }
        return res.status(200).json(foundReport).send();
    } catch (error) {
        next(error);
    }
}

// export const updateFoundReport = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id
//         const foundReport = await FoundReport.findByIdAndUpdate(id, req.body)
//         if (!foundReport) {
//             throw new NotFoundError("Could not find FoundReport")
//         }
//         return res.status(200).json(foundReport).send("Your found report has been updated");
//     } catch (error) {
//         next(error);
//     }
// }

export const updateFoundReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Find existing report
    const existingReport = await FoundReport.findById(id);
    if (!existingReport) throw new NotFoundError("Could not find FoundReport");

    const previousStatus = existingReport.status;

    // Update the report
    const updatedReport = await FoundReport.findByIdAndUpdate(id, updateData, { new: true });

    // Check if status changed and there's an email or phone number
    if (
      updatedReport &&
      previousStatus !== updatedReport.status
    ) {
      // Send email update
      if (updatedReport.email) {
        await sendStatusUpdateEmail(
          updatedReport.email,
          updatedReport.name,
          updatedReport.referanceNo,
          updatedReport.status
        );
      }

      // Send SMS update if phone number exists
      if (updatedReport.phoneNo) {
        const smsMessage = `Hi ${updatedReport.name}, the status of your found item report (Ref: ${updatedReport.referanceNo}) has been updated to '${updatedReport.status}'.`;
        await sendSMS(updatedReport.phoneNo, smsMessage);
      }
    }

    return res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
};


export const deleteFoundReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const foundReport = await FoundReport.findByIdAndDelete(id)
        if (!foundReport) {
            throw new NotFoundError("Could not find FoundReport")
        }
        return res.status(200).send("You have successfully deleted the report");
    } catch (error) {
        next(error)
    }
}
