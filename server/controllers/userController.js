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

/** Register New User */
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

/** User Login */
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
      secure: false, //  Change from true → false for local development
      sameSite: "Lax", // Change from "None" → "Lax" for local development
    });

    const { password: _, ...otherDetails } = user;
    return res.status(200).json({ message: "Login successful!", details: otherDetails });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An internal server error occurred." });
  }
};

/** Fetch Logged-In User Details */
export const LoggedUserDetails = async (req, res) => {
  try {
      const token = req.cookies.access_token;
      if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
          if (err) {
              console.error("Error fetching user:", err);
              return res.status(500).json({ message: "An error occurred!" });
          }
          if (result.length === 0) {
              return res.status(404).json({ message: "User not found!" });
          }

          const { password: _, ...otherDetails } = result[0];
          return res.status(200).json({ details: otherDetails });
      });
  } catch (error) {
      console.error("Unexpected error in LoggedUserDetails:", error);
      return res.status(500).json({ message: "An error occurred!" });
  }
};

/** Logout User */
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

/** Verify Token Middleware */
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token; //Use optional chaining to prevent errors

  if (!token) {
      return res.status(401).json({ message: "Unauthorized: No authentication token found" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      db.query("SELECT id, phone_number, role FROM users WHERE id = ?", [decoded.id], (err, result) => {
          if (err) {
              console.error(" Database Error:", err);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (result.length === 0) {
              return res.status(403).json({ message: "Invalid user" });
          }
          req.user = result[0]; //Attach user data to request
          next();
      });
  } catch (error) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
export const getFarmers = async (req, res) => {
  if(!req.user){
    return res.status(401).json({ message: "Unauthorized: No user information found" });
  }
  try {
    let q;

    if (req.user.role === "Farmer") {
      q = "SELECT * FROM users WHERE role='Buyer' ORDER BY first_name";  // Assuming ordering by name
    } else {
      q = "SELECT * FROM users WHERE role='Farmer' ORDER BY first_name"; // Corrected ORDER BY
    }

    db.query(q, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Error occurred during user fetching!" });
      }
      return res.status(200).json(result);
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/** Update Profile */
export const updateProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: You cannot change someone else's account!" });
  }

  try {
    const userId = req.user.id;
    const { first_name, last_name } = req.body;
    const profile = req.file ? req.file.filename : null;

    // Fetch current user details
    const selectQuery = "SELECT first_name, last_name, profile FROM users WHERE id=?";
    
    db.query(selectQuery, [userId], (selectErr, result) => {
      if (selectErr) {
        console.error("Database error while fetching user:", selectErr);
        return res.status(500).json({ message: "An error occurred while retrieving user data." });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found!" });
      }

      const currentUser = result[0];

      // Only update fields that have changed
      const updatedFirstName = first_name && first_name !== currentUser.first_name ? first_name : currentUser.first_name;
      const updatedLastName = last_name && last_name !== currentUser.last_name ? last_name : currentUser.last_name;
      const updatedProfile = profile ? profile : currentUser.profile;

      if (updatedFirstName === currentUser.first_name &&
          updatedLastName === currentUser.last_name &&
          updatedProfile === currentUser.profile) {
        return res.status(200).json({ message: "Profile remains the same.", updatedUser: currentUser });
      }

      // Update only the changed fields
      const updateQuery = "UPDATE `users` SET `first_name`=?, `last_name`=?, `profile`=? WHERE `id`=?";
      const values = [updatedFirstName, updatedLastName, updatedProfile, userId];

      db.query(updateQuery, values, (updateErr, data) => {
        if (updateErr) {
          console.error("Database error:", updateErr);
          return res.status(500).json({ message: "An error occurred while updating user data." });
        }

        // Fetch the updated user details
        db.query(selectQuery, [userId], (newSelectErr, updatedResult) => {
          if (newSelectErr) {
            return res.status(500).json({ message: "Error retrieving updated user details." });
          }

          res.status(200).json({ message: "Profile updated successfully!", updatedUser: updatedResult[0] });
        });
      });
    });
  } catch (error) {
    console.error("Error occurred while updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const changePassword = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: You cannot change someone else's password!" });
  }

  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!id || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Fetch the current password from the database
    const q = "SELECT password FROM users WHERE id = ?";
    db.query(q, [id], async (err, result) => {
      if (err) return res.status(500).json({ message: "Database error!" });
      if (result.length === 0) return res.status(404).json({ message: "User not found!" });

      const hashedPassword = result[0].password;

      // Check if old password matches
      const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong old password!" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password in database
      const updateQ = "UPDATE users SET password = ? WHERE id = ?";
      db.query(updateQ, [newHashedPassword, id], (updateErr) => {
        if (updateErr) return res.status(500).json({ message: "Error updating password!" });

        return res.status(200).json({ success: true, message: "Password updated successfully!" });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
export const resetPasswordWithToken = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || typeof newPassword !== "string") {
    return res.status(400).json({ error: "New password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [hashedPassword, token]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ error: "Failed to reset password" });
  }
};