import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);

        socket.on("joinRoom", (userId) => {
            socket.join(userId.toString());
            console.log(`🔵 User ${userId} joined their room`);
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}
