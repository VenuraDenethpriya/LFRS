import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const user = await clerkClient.users.getUser(userId);
    const userRole = user.publicMetadata?.role || user.privateMetadata?.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: User is not an admin." });
    }

    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};