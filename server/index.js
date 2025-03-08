import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { db } from "./connectdb.js";
import cropRoute from "./routes/Crops.js";
import notificationRoute from "./routes/Notifacation.js"; // ✅ Fixed spelling!
import orderRoute from "./routes/Orders.js";
import userRoute from "./routes/User.js";

const app = express();

// ✅ Middleware (Order matters!)
app.use(cookieParser()); // ✅ Parse cookies before anything else
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Allow frontend to send cookies
}));
app.use(express.json()); // ✅ Ensure JSON parsing
app.use(bodyParser.json());

// ✅ Routes
app.use("/server/user", userRoute);
app.use("/server/crop", cropRoute);
app.use("/server/notification", notificationRoute);
app.use("/server/order", orderRoute);

// ✅ Database Connection
db.connect((err) => {
    if (err) {
        console.log("❌ Failed to connect to the database:", err);
    } else {
        console.log("✅ Connected to the database");
    }
});

// ✅ Start Server
app.listen(8800, () => {
    console.log("🚀 Server is running on port 8800");
});
