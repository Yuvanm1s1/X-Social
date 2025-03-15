import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging
const app = express();
const PORT = process.env.PORT || 8000; // Ensure a valid port
app.use(express.json()); //parse req.body
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.listen(PORT, "0.0.0.0", () => { // Explicitly define the host
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});
