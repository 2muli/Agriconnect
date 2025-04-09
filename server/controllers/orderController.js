import { db } from "../connectdb.js";

export const addOrder = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { seller_id, crop_id, quantity } = req.body;
    const buyer_id = req.user.id;
  const status = "Pending";
    if (!seller_id || !crop_id || !quantity || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }
   if (req.user.role !== "Buyer"){
    return res.status(403).json({ message: "Unauthorized: Only orders can add order" });
   }
    // Check if seller_id exists
    const checkSellerQuery = "SELECT id FROM users WHERE id = ?";
    db.query(checkSellerQuery, [seller_id], (err, sellerResult) => {
        if (err) {
            console.error("Error checking seller:", err);
            return res.status(500).json({ message: "Internal server error122" });
        }

        if (sellerResult.length === 0) {
            return res.status(404).json({ message: "User not found: Invalid seller ID" });
        }

        // If seller exists, proceed with inserting the order
        const insertOrderQuery = "INSERT INTO orders (buyer_id, seller_id, crop_id, quantity, status) VALUES (?, ?, ?, ?, ?)";
        db.query(insertOrderQuery, [buyer_id, seller_id, crop_id, quantity, status], (err, result) => {
            if (err) {
                console.error("Error adding order:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(201).json({ message: "Order added successfully" });
        });
    });
};
export const deleteOrder= (req, res)=>{
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const buyer_id = req.user.id; // Logged-in user
    const checkQuery = "SELECT buyer_id FROM orders WHERE id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json("Error occurred while verifying order ownership!");
        if (result.length === 0) return res.status(404).json({ message: "Order not found!" });

        const deleteQuery = "DELETE FROM orders WHERE id = ?";
        db.query(deleteQuery, [id], (deleteErr) => {
            if (deleteErr) return res.status(500).json("Error occurred during order deletion!");
            return res.status(200).json("Order deleted successfully!");
        });
    });

}
export const updateOrder = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const { id } = req.params;
    const buyer_id = req.user.id; // Logged-in user
    const { seller_id, crop_id, quantity, status } = req.body;

    const checkQuery = "SELECT buyer_id FROM orders WHERE id =?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) return res.status(500).json("Error occurred while verifying order ownership!");
        if (result.length === 0) return res.status(404).json({ message: "Order not found!" });

        // Ensure the logged-in user is the owner
        if (result[0].buyer_id !== buyer_id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own orders!" });
        }
        const updateQuery = "UPDATE orders SET seller_id = ?, crop_id = ?, quantity = ?, status = ? WHERE id = ?";
        db.query(updateQuery, [seller_id, crop_id, quantity, status, id], (updateErr) => {
            if (updateErr) return res.status(500).json("Error occurred during order update!");
            return res.status(200).json("Order updated successfully!");
        });
    }
    );
}
export const getAllUnpendingOrders = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
    
    const user_id = req.user.id;
    const query = `
        SELECT orders.*, 
               buyers.first_name AS buyer_first_name, buyers.last_name AS buyer_last_name, buyers.phone_number AS buyer_phone, 
               sellers.first_name AS seller_first_name, sellers.last_name AS seller_last_name, sellers.phone_number AS seller_phone, 
               crops.crop_name 
        FROM orders
        JOIN users AS buyers ON buyers.id = orders.buyer_id  
        JOIN users AS sellers ON sellers.id = orders.seller_id  
        JOIN crops ON orders.crop_id = crops.id
        WHERE orders.status != 'Pending' 
          AND (orders.buyer_id = ? OR orders.seller_id = ?);
    `;

    db.query(query, [user_id, user_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result);
    });
};
export const getAllOrders = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }
    
    const user_id = req.user.id;
    const query = `
        SELECT orders.*, 
               buyers.first_name AS buyer_first_name, buyers.last_name AS buyer_last_name, buyers.phone_number AS buyer_phone, 
               sellers.first_name AS seller_first_name, sellers.last_name AS seller_last_name, sellers.phone_number AS seller_phone, 
               crops.crop_name 
        FROM orders
        JOIN users AS buyers ON buyers.id = orders.buyer_id  
        JOIN users AS sellers ON sellers.id = orders.seller_id  
        JOIN crops ON orders.crop_id = crops.id
        WHERE orders.buyer_id = ? OR orders.seller_id = ?;
    `;

    db.query(query, [user_id, user_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result);
    });
};


export const getOrdersBySeller = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const seller_id = req.user.id;
    const query = "SELECT * FROM orders WHERE seller_id = ?";
    db.query(query, [seller_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result);
    });
}
export const approveOrder = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    let { id } = req.params;
    id = parseInt(id); // ✅ Ensure ID is treated as a number
    const seller_id = req.user.id;

    if (!seller_id) {
        return res.status(403).json({ message: "Forbidden: Only the receiver (seller) can approve orders" });
    }

    console.log(`Attempting to approve order with ID: ${id}, Seller ID: ${seller_id}`); // 🛠 Debugging log

    const query = "UPDATE orders SET status = 'Approved' WHERE id = ? AND seller_id = ?";
    db.query(query, [id, seller_id], (err, result) => {
        if (err) {
            console.error("Error approving order:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            console.warn(`No order updated. Either order does not exist or seller ID mismatch (Order ID: ${id}, Seller ID: ${seller_id})`);
            return res.status(404).json({ message: "Order not found or you are not the seller" });
        }
        res.status(200).json({ message: "Order approved successfully" });
    });
};

export const rejectOrder = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    let { id } = req.params;
    id = parseInt(id); // ✅ Convert to number
    const seller_id = req.user.id;

    if (!seller_id) {
        return res.status(403).json({ message: "Forbidden: Only the receiver (seller) can reject orders" });
    }

    console.log(`Attempting to reject order with ID: ${id}, Seller ID: ${seller_id}`); // 🛠 Debugging log

    const query = "UPDATE orders SET status = 'Rejected' WHERE id = ? AND seller_id = ?";
    db.query(query, [id, seller_id], (err, result) => {
        if (err) {
            console.error("Error rejecting order:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            console.warn(`No order updated. Either order does not exist or seller ID mismatch (Order ID: ${id}, Seller ID: ${seller_id})`);
            return res.status(404).json({ message: "Order not found or you are not the seller" });
        }
        res.status(200).json({ message: "Order rejected successfully" });
    });
};

export const getAcceptedOrders = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const query = "SELECT * FROM orders WHERE status = 'Approved' AND (buyer_id = ? OR seller_id = ?)";
    
    db.query(query, [user_id, user_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result);
    });
};
export const getRejectedOrders = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const query = "SELECT * FROM orders WHERE status = 'Rejected' AND (buyer_id = ? OR seller_id = ?)";
    
    db.query(query, [user_id, user_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json(result);
    });
};
export const getPendingOrders = (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const user_id = req.user.id;
    const query = `SELECT 
    orders.*, 
    buyers.first_name AS buyer_first_name, 
    buyers.last_name AS buyer_last_name, 
    buyers.phone_number AS buyer_phone, 
    sellers.first_name AS seller_first_name, 
    sellers.last_name AS seller_last_name, 
    sellers.phone_number AS seller_phone, 
    crops.crop_name 
FROM orders
JOIN users AS buyers ON buyers.id = orders.buyer_id  
JOIN users AS sellers ON sellers.id = orders.seller_id  
JOIN crops ON orders.crop_id = crops.id
WHERE orders.status = 'Pending' 
AND (orders.buyer_id = ? OR orders.seller_id = ?);
`;
    
    db.query(query, [user_id, user_id], (err, result) => {
        if (err) {
            console.error("Error fetching pending orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No pending orders found" });
        }
        res.status(200).json(result);
    });
};
export const getMyOrdersNumber = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const seller_id = req.user.id;
    const query = "SELECT COUNT(*) as ordersNumber FROM orders WHERE seller_id = ? or buyer_id = ?";
    db.query(query, [seller_id, seller_id], (err, result) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        // Ensure result is not empty before accessing result[0]
        const ordersNumber = result.length > 0 ? result[0].ordersNumber : 0;
        res.status(200).json({ ordersNumber });
    });
};
