import { db } from "../connectdb.js";
import { getIO } from "../socket.js";

export const addNotification = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { receiver_id, notification } = req.body;
    const sender_id = req.user.id;

    if (!receiver_id || !notification) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if receiver exists
    const checkQuery = "SELECT id FROM users WHERE id = ?";
    db.query(checkQuery, [receiver_id], (err, userExists) => {
      if (err) return res.status(500).json({ message: "Database error!" });
      if (userExists.length === 0) return res.status(404).json({ message: "Receiver not found" });

      // Insert notification
      const insertQuery = "INSERT INTO notification (sender_id, receiver_id, notification, created_at) VALUES (?, ?, ?, NOW())";
      db.query(insertQuery, [sender_id, receiver_id, notification], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error!" });

        const newNotification = { id: result.insertId, sender_id, receiver_id, notification };

        // Emit notification event to the receiver
        const io = getIO();
        io.to(receiver_id.toString()).emit("newNotification", newNotification);

        res.status(201).json({ message: "Notification added successfully", newNotification });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyNotifications = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user information found" });
  }

  const userId = req.user.id;
  const q = `
    SELECT notification.*, 
           sender.first_name AS sender_first_name, 
           sender.last_name AS sender_last_name,
           DATE_FORMAT(notification.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
    FROM notification
    LEFT JOIN users AS sender ON notification.sender_id = sender.id
    WHERE notification.receiver_id = ? OR notification.sender_id = ?
    ORDER BY notification.created_at DESC
  `;

  db.query(q, [userId, userId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching notifications:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};


export const updateNotification = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { receiver_id,notification } = req.body;
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

            const updateQuery = "UPDATE notification SET receiver_id=?,notification = ? WHERE id = ?";
            db.query(updateQuery, [receiver_id,notification, id], (updateErr, updateResult) => {
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
        // if (result[0].sender_id !== sender_id) {
        //     return res.status(403).json({ message: "Unauthorized: You can only delete your own notification!" });
        // }
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

// export const getMyNotifications = async (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized: No user information found" });
//     }

//     const id=req.user.id;
//     const q = `
//     SELECT notification.*, 
//            sender.first_name AS sender_first_name, sender.last_name AS sender_last_name, sender.phone_number AS sender_phone,
//            receiver.first_name AS receiver_first_name, receiver.last_name AS receiver_last_name, receiver.phone_number AS receiver_phone
//     FROM notification
//     LEFT JOIN users AS sender ON notification.sender_id = sender.id
//     LEFT JOIN users AS receiver ON notification.receiver_id = receiver.id
//     WHERE notification.receiver_id = ? OR notification.sender_id = ?
//     ORDER BY notification.created_at DESC
// `;
//     db.query(q, [id,id], (err, result) => {
//         if (err) {
//             console.error("❌ Error fetching notifications:", err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         return res.status(200).json(result);
//     });
// };
export const getNotificationByid = async (req, res) => {
    const { id } = req.params;
    const q = `SELECT notification.*,users.first_name,users.last_name,users.phone_number
     FROM notification
     JOIN users ON notification.receiver_id = users.id WHERE notification.id = ?`;
    try {
        db.query(q, [id], (err, result) => {
            if (err) return res.status(500).json("Error occurred during notification fetching!");
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log("Error occurred during notification fetching: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getMyNotificationsNumber = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.user;
    const q = `SELECT COUNT(*) AS numberOfMyNotification FROM notification WHERE receiver_id=? or sender_id=?`; // Ensure correct column

    try {

        db.query(q, [id,id], (err, result) => {
            if (err) {
                console.error("❌ Database query error:", err);
                return res.status(500).json({ message: "Error occurred during notification fetching!" });
            }


            // Ensure result is valid and contains data
            const numberOfMyNotification = result?.[0]?.numberOfMyNotification || 0;

            return res.status(200).json({ numberOfMyNotification });
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};