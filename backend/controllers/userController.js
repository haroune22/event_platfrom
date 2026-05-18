import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../config/db.js';

export const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const emailLower = email.toLowerCase();

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [emailLower]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user.id);

        const { password: _, ...safeUser } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: safeUser,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const Register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const emailLower = email.toLowerCase();
        // check if user exists
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE email = ? OR name = ?",
            [emailLower, username]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert user
        await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [username, emailLower, hashedPassword]
        );

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const Logout = async (req, res) => {
  // this is logout using cookies
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    });
    // res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const getUser = async(req, res) => {
    const user = req.user.id
    try {

         const [User] = await db.query(
            "SELECT id, name, email, profilePic, bio, createdAT FROM users WHERE id = ?",
            [user]
        );

        if (User.length === 0) {
            return res.status(409).json({ message: "User not found" });
        }
        
        return res.status(201).json({ message: "User retrieved successfully", user: User[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}