import { db } from "../connectdb.js";



export const addNotification = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user information found" });
        }

        const { receiver_id, notification } = req.body;
        const sender_id = req.user.id;

        // Validate inputs
        if (!receiver_id || !notification) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if receiver exists
        const checkQuery = "SELECT id FROM users WHERE id = ?";
        const [userExists] = await db.promise().query(checkQuery, [receiver_id]);

        if (userExists.length === 0) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        // Insert notification
        const insertQuery = "INSERT INTO notification (sender_id, receiver_id, notification) VALUES (?, ?, ?)";
        await db.promise().query(insertQuery, [sender_id, receiver_id, notification]);

        res.status(201).json({ message: "Notification added successfully" });
    } catch (error) {
        console.error("Error adding notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateNotification = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { notification } = req.body;
    const { id } = req.params;
    const sender_id = req.user.id; // Logged-in user

    if (!notification) {
        return res.status(400).json({ message: "Notification is required" });
    }

    try {
        // Step 1: Check if the notification exists and belongs to the sender
        const checkQuery = "SELECT sender_id FROM notification WHERE id = ?";
        db.query(checkQuery, [id], (err, results) => {
            if (err) {
                console.error("Error checking notification:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            // If no notification found
            if (results.length === 0) {
                return res.status(404).json({ message: "Notification not found" });
            }

            // Ensure the logged-in user is the sender
            if (results[0].sender_id !== sender_id) {
                return res.status(403).json({ message: "Unauthorized: You can only update your own notifications" });
            }

            const updateQuery = "UPDATE notification SET notification = ? WHERE id = ?";
            db.query(updateQuery, [notification, id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("Error updating notification:", updateErr);
                    return res.status(500).json({ message: "Internal server error" });
                }
                res.status(200).json({ message: "Notification updated successfully" });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteNotification = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const sender_id = req.user.id; // Logged-in user
    const checkQuery = "SELECT sender_id FROM notification WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json("Error occurred while verifying notification ownership!");
        if (result.length === 0) return res.status(404).json({ message: "Notification not found!" });

        // Ensure the logged-in user is the owner
        if (result[0].sender_id !== sender_id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own notification!" });
        }
        const deleteQuery = "DELETE FROM notification WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json("Error occurred during notification deletion!");
            return res.status(200).json("Notification deleted successfully!");
        });
    });

}
export const sentNotifications = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.user;

    const q = "SELECT * FROM notification WHERE sender_id = ? ORDER BY created_at DESC";

    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("Error fetching notifications:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(200).json({ message: "No notifications found", notifications: [] });
        }

        res.status(200).json({ notifications: result });
    });
};

export const getMyNotifications = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.user;
    const q = "SELECT * FROM notification WHERE receiver_id = ? ORDER BY created_at DESC";

    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("❌ Error fetching notifications:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json(result);
    });
};

