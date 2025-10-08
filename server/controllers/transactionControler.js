import { db } from "../connectdb.js";

// GET all transactions
export const getAllTransactions = async (req, res) => {
  const q = "SELECT * FROM transaction ORDER BY createdAt";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Error retrieving transactions" });
    if (data.length === 0) return res.status(404).json({ message: "No transactions found" });
    return res.status(200).json(data);
  });
};

// GET single transaction by id
export const getBuyerTransaction = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user information found." });
}

const user_id = req.user.id;
  const q = "SELECT * FROM transaction WHERE buyerId = ?";
  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Error occurred during transaction retrieval" });
    if (data.length === 0) return res.status(404).json({ message: "No transaction found" });
    return res.status(200).json(data);
  });
};
//Getting transaction by id
export const getTransactionById=async(req,res)=>{
  const { id } = req.params;
  const q = "SELECT * FROM transaction WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "Error occurred during transaction retrieval" });
    if (data.length === 0) return res.status(404).json({ message: "No transaction found" });
    return res.status(200).json(data[0]);
  });
}

// ADD new transaction
export const addTransaction = async (req, res) => {
  const { farmer_id, crop_name, crop_quantity, unit_price, transactionDate } = req.body;

   if(!req.user){
    return res.status(401).json({ message: "Unauthorized: No user information found." });
   }
   const buyerId=req.user.id;
  if (!farmer_id || !crop_name || !crop_quantity || !unit_price || !transactionDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q = `
    INSERT INTO transaction (buyerId,farmer_id, crop_name, crop_quantity, unit_price, transactionDate)
    VALUES (?, ?, ?, ?, ?,?)
  `;

  db.query(q, [buyerId,farmer_id, crop_name, crop_quantity, unit_price, transactionDate], (err, data) => {
    if (err) return res.status(500).json({ message: "Error inserting transaction", error: err });
    return res.status(201).json({ message: "Transaction added successfully" });
  });
};

// UPDATE transaction
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { crop_name, crop_quantity, unit_price, transactionDate,farmer_id } = req.body;

  if(!req.user){
    return res.status(401).json({ message: "Unauthorized: No user information found." });
   }
   const buyerId=req.user.id;

  const q = `
    UPDATE transaction 
    SET crop_name = ?, crop_quantity = ?, unit_price = ?, transactionDate = ?,buyerId=?,farmer_id=?
    WHERE id = ?
  `;

  db.query(q, [crop_name, crop_quantity, unit_price, transactionDate,buyerId,farmer_id,id], (err, data) => {
    if (err) return res.status(500).json({ message: "Error updating transaction" });
    if (data.affectedRows === 0) return res.status(404).json({ message: "Transaction not found" });
    return res.status(200).json({ message: "Transaction updated successfully" });
  });
};

// DELETE transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM transaction WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "Error deleting transaction" });
    if (data.affectedRows === 0) return res.status(404).json({ message: "Transaction not found" });
    return res.status(200).json({ message: "Transaction deleted successfully" });
  });
};
