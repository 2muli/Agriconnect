import { db } from "../connectdb.js";
export const addProduce = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
    if (req.user.role !== "Farmer") {
        return res.status(403).json({ message: "Unauthorized: Only farmers can add produce" });
    }
    const { crop_name, quantity, price, location, harvest_date } = req.body;
    const user_id = req.user.id;  // Now safe to access

    if (!crop_name || !quantity || !price || !location || !harvest_date || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO crops (user_id, crop_name, quantity, price, location, harvest_date) VALUES (?, ?, ?, ?, ?, ?)";
    try {
        await db.query(query, [user_id, crop_name, quantity, price, location, harvest_date]);
        res.status(201).json({ message: "Produce added successfully" });
    } catch (error) {
        console.error("Error adding produce:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getCrops = async (req, res) => {
    const q = `SELECT crops.*,users.first_name,users.last_name,users.phone_number FROM 
    crops JOIN users ON users.id = crops.user_id ORDER BY crop_name`;
    try {
        db.query(q, (err, result) => {
            if (err) return res.status(500).json("Error occurred during crop fetching!");
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log("Error occurred during crop fetching: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getMyCrops = (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found." });
    }

    const user_id = req.user.id;

    const q = "SELECT * FROM crops WHERE user_id=? ORDER BY crop_name";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching crops.", error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No crops found for this user." });
        }

        return res.status(200).json(result);
    });
};

export const getCropsByUser = async (req, res) => {
    const { user_id } = req.params;

    // Fetch crops that the buyer can view
    const q = "SELECT * FROM crops WHERE user_id = ?";

    db.query(q, [user_id], (err, result) => {
        if (err) {
            console.error("❌ Error fetching crops:", err);
            return res.status(500).json({ message: "Internal server error while fetching crops!" });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: "No crops found for this user." });
        }

        return res.status(200).json(result);
    });
};

export const getCropByid = async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM crops WHERE id = ?";
    try {
        db.query(q, [id], (err, result) => {
            if (err) return res.status(500).json("Error occurred during crop fetching!");
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log("Error occurred during crop fetching: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateCrop = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { crop_name, quantity, price, location, harvest_date } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    // First, check if the crop exists and belongs to the logged-in user
    const checkQuery = "SELECT user_id FROM crops WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json("Error occurred while verifying crop ownership!");
        if (result.length === 0) return res.status(404).json({ message: "Crop not found!" });

        // Ensure the logged-in user is the owner
        if (result[0].user_id !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own crops!" });
        }

        // Proceed with update
        const updateQuery = "UPDATE crops SET crop_name = ?, quantity = ?, price = ?, location = ?, harvest_date = ? WHERE id = ?";
        db.query(updateQuery, [crop_name, quantity, price, location, harvest_date, id], (updateErr) => {
            if (updateErr) return res.status(500).json("Error occurred during crop update!");
            return res.status(200).json("Crop updated successfully!");
        });
    });
};

export const deleteCrop = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const user_id = req.user.id;

    // First, check if the crop exists and belongs to the logged-in user
    const checkQuery = "SELECT user_id FROM crops WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json("Error occurred while verifying crop ownership!");
        if (result.length === 0) return res.status(404).json({ message: "Crop not found!" });

        // Ensure the logged-in user is the owner
        if (result[0].user_id !== user_id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own crops!" });
        }

        // Proceed with deletion
        const deleteQuery = "DELETE FROM crops WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json("Error occurred during crop deletion!");
            return res.status(200).json("Crop deleted successfully!");
        });
    });
};
export const getMyCropNumber = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
    const { id } = req.user;
    const q = "SELECT COUNT(*) as cropNumber FROM crops WHERE user_id = ?";
    try {
        db.query(q, [id], (err, result) => {
            if (err) return res.status(500).json("Error occurred during crop fetching!");
            return res.status(200).json(result);
        
        });
    } catch (error) {
        console.log("Error occurred during crop fetching: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getAllCropNumber = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
    const { id } = req.user;
    const q = "SELECT COUNT(*) as cropNumber FROM crops";
    try {
        db.query(q, [id], (err, result) => {
            if (err) return res.status(500).json("Error occurred during crop fetching!");
            return res.status(200).json(result);
        
        });
    } catch (error) {
        console.log("Error occurred during crop fetching: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}