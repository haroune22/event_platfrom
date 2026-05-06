import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
        const q = "SELECT id, name, email, bio, profilePic FROM users WHERE id = ?"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await db.query(
            q,
            [decoded.id]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = rows[0];
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).json({ message: "Invalid token" });
    }
};