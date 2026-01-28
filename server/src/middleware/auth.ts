import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Extend the Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    const decoded = verifyToken(token);
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
