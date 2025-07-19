import { Request, Response, NextFunction } from "express";
import FoundReport from "../infrastructure/schemas/FoundReport";
import NotFoundError from "../domain/errors/not-found-error";
import { clerkClient, getAuth } from "@clerk/express";
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

// export const getFoundReport = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {
//       referance,
//       category,
//       location,
//       policeStation,
//       district,
//       date,
//       status,
//       limit = '10',
//       offset = '0',
//     } = req.query;

//     const query: any = {};

//     interface SessionClaims {
//       metadata?: {
//         role?: string;
//       };
//     }

//     const auth = getAuth(req);
//     console.log("Full Clerk session claims received:", auth.sessionClaims);


//     const sessionClaims = auth.sessionClaims as SessionClaims;
//     const { userId } = getAuth(req);
//     console.log("Clerk User ID:", userId);
//     console.log("Clerk Session Claims Metadata:", sessionClaims?.metadata);
//     console.log("Clerk User Role:", sessionClaims?.metadata?.role);
//     console.log("Full Clerk session claims:", auth.sessionClaims);

//     if (!userId) {
//       // If no userId, the user is not authenticated.
//       // Depending on your requirements, you might return an empty array,
//       // or explicitly deny access. Here, we deny access.
//       console.log("Unauthorized access: No user ID found.");
//       return res.status(401).json({ message: "Unauthorized: User not authenticated." });
//     }

//     if (sessionClaims?.metadata?.role !== "admin") {
//       // If the user is not an admin, they should only see reports they created.
//       // Ensure your FoundReport model has a 'createdBy' field storing the Clerk userId.
//       query.createdBy = userId;
//       console.log(`User ${userId} (not admin) is requesting reports. Filtering by createdBy.`);
//     } else {
//       // If the user is an admin, no 'createdBy' filter is applied,
//       // allowing them to see all reports.
//       console.log(`Admin user ${userId} is requesting all reports.`);
//     }


//     if (referance) query.referanceNo = { $regex: referance, $options: 'i' };
//     if (category) query.category = { $in: [category] };
//     if (location) query.location = { $regex: location, $options: 'i' };
//     if (policeStation) query.nearestPoliceStation = { $regex: policeStation, $options: 'i' };
//     if (district) query.district = { $regex: district, $options: 'i' };


//     if (date && typeof date === 'string') {
//       query.dateOfFound = new Date(date);
//     }
//     if (status) query.status = { $regex: status, $options: 'i' };
//     console.log("Final Query:", query);

//     const totalCount = await FoundReport.countDocuments(query);
//     const reports = await FoundReport.find(query)
//       .limit(parseInt(limit as string))
//       .skip(parseInt(offset as string))
//       .populate('category')
//       .sort({ createdAt: -1 });
//     return res.status(200).json({
//       totalCount,
//       data: reports,
//     }
//     );
//   } catch (error) {
//     next(error);
//   }
// }

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

    // interface SessionClaims {
    //   metadata?: {
    //     role?: string;
    //   };
    // }

    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    // Fetch user info from Clerk
    const user = await clerkClient.users.getUser(userId);
    // Try publicMetadata first, fallback to privateMetadata if needed
    const userRole = user.publicMetadata?.role || user.privateMetadata?.role;
    console.log("Clerk User Role:", userRole);

    if (userRole !== "admin") {
      query.createBy = userId;
      console.log(`User ${userId} (not admin) is requesting reports. Filtering by createdBy.`);
    } else {
      console.log(`Admin user ${userId} is requesting all reports.`);
    }


    if (referance) query.referanceNo = { $regex: referance, $options: 'i' };
    if (category) query.category = { $in: [category] };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (policeStation) query.nearestPoliceStation = { $regex: policeStation, $options: 'i' };
    if (district) query.district = { $regex: district, $options: 'i' };


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