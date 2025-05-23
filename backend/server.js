import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import { v2 as cloudinary } from 'cloudinary';
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import path from "path";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging
const app = express();
const PORT = process.env.PORT || 8000; // Ensure a valid port
const __dirname = path.resolve();
app.use(express.json({limit:"5mb"})); //parse req.body
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notifications",notificationRoutes)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT, "0.0.0.0", () => { // Explicitly define the host
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
