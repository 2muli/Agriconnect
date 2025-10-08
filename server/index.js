import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import path from "path";
import { db } from "./connectdb.js";
import contactRoutes from "./routes/contactRoute.js";
import cropRoute from "./routes/Crops.js";
import notificationRoute from "./routes/Notifacation.js";
import orderRoute from "./routes/Orders.js";
import resetPasswordRoutes from "./routes/resetPasswordRoute.js";
import transactionRoute from './routes/Transaction.js';
import userRoute from "./routes/User.js";
import { initializeSocket } from "./socket.js";
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

// Serve profile images
const profilePath = path.join(process.cwd(), "client/public/profile");
app.use("/profile", express.static(profilePath));

// Routes
app.use("/server/user", userRoute);
app.use("/server/crop", cropRoute);
app.use("/server/notification", notificationRoute);
app.use("/server/order", orderRoute);
app.use('/server/transaction',transactionRoute)
app.use("/server/contact", contactRoutes);
app.use("/server/resetPassword", resetPasswordRoutes);
// Initialize Socket.io
initializeSocket(server);

// Database Connection
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to the database");
    }
});

// Start Server
server.listen(8800, () => {
    console.log("🚀 Server running on port 8800");
});
