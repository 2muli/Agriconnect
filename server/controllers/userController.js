import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { promisify } from "util";
import { db } from "../connectdb.js";

// Define upload directory for profile images
const uploadDir = path.join(process.cwd(), "client/public/profile");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage }).single("profile");

// Promisify database query
const query = promisify(db.query).bind(db);

// Promisify multer upload function
const uploadPromise = (req, res) =>
  new Promise((resolve, reject) => {
    upload(req, res, (err) => (err ? reject(err) : resolve()));
  });

export const register = async (req, res) => {
  try {
    await uploadPromise(req, res);

    const { first_name, last_name, email, phone_number, role, password } = req.body;

    if (!first_name || !last_name || !email || !phone_number || !role || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email or phone number already exists
    const checkQuery = "SELECT * FROM users WHERE email = ? OR phone_number = ?";
    const results = await query(checkQuery, [email, phone_number]);

    if (results.length > 0) {
      return res.status(400).json({
        message:
          results.some((user) => user.email === email)
            ? "Email is already taken."
            : "Phone number is already taken.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = req.file ? req.file.filename : null;

    // Insert user into database
    const insertQuery =
      "INSERT INTO users (first_name, last_name, email, profile, phone_number, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await query(insertQuery, [first_name, last_name, email, profile, phone_number, role, hashedPassword]);

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error in register:", error);

    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlink(path.join(uploadDir, req.file.filename), (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
      });
    }

    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

export const login = async (req, res) => {
  try {
    const { phone_number, email, password } = req.body;

    if (!phone_number && !email) {
      return res.status(400).json({ message: "Phone number or email is required!" });
    }

    const q = phone_number
      ? "SELECT * FROM users WHERE phone_number = ?"
      : "SELECT * FROM users WHERE email = ?";
    const users = await query(q, [phone_number || email]);

    if (!users.length) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set HTTP-Only Cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // ❌ Change from true → false for local development
      sameSite: "Lax", // ✅ Change from "None" → "Lax" for local development
    });
    

    const { password: _, ...otherDetails } = user;
    return res.status(200).json({ message: "Login successful!", details: otherDetails });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const LoggedUserDetails = async (req, res) => {
  try {
      const token = req.cookies.access_token;
      if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
          if (err) {
              console.error("❌ Error fetching user:", err);
              return res.status(500).json({ message: "An error occurred!" });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: "User not found!" });
          }

          const { password: _, ...otherDetails } = result[0];
          return res.status(200).json({ details: otherDetails });
      });
  } catch (error) {
      console.error("❌ Unexpected error in LoggedUserDetails:", error);
      return res.status(500).json({ message: "An error occurred!" });
  }
};

export const logout = (req, res) => {
  try {
    if (!req.cookies.access_token) {
      return res.status(200).json({ message: "You were already logged out!" });
    }

    // Clear cookie properly
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    return res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "An error occurred while logging out." });
  }
};
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token; // ✅ Use optional chaining to prevent errors

  if (!token) {
      return res.status(401).json({ message: "Unauthorized: No authentication token found" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      db.query("SELECT id, phone_number, role FROM users WHERE id = ?", [decoded.id], (err, result) => {
          if (err) {
              console.error("❌ Database Error:", err);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (result.length === 0) {
              return res.status(403).json({ message: "Invalid user" });
          }
          req.user = result[0]; // ✅ Attach user data to request
          next();
      });
  } catch (error) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
