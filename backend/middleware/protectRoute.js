// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken"; // ✅ Make sure this is imported!
// export const protectRoute =async (req,res,next)=>{
//     try{
//         const token = req.cookies.jwt;
//         if(!token){
//             return res.status(401).json({error:"You need to login"})
//         }
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         if(!decoded){
//             return res.status(401).json({error:"Invalid token"})
//         }
//         const user = await User.findById(decoded.userId).select("-password");
//         if(!user){
//             return res.status(404).json({error:"User not found"})
//         }  
//         req.user = user;
//         next(); 
//     }catch(error){
//         res.status(400).json({error:"Internal server error"})
// }}



import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        console.log("🔹 Checking for token in cookies...");
        console.log("🔹 Cookies received:", req.cookies); // Debugging log

        // ✅ Fix: Correct way to access cookies
        const token = req.cookies?.jwt;

        if (!token) {
            console.log("🔴 No token found. Unauthorized request.");
            return res.status(401).json({ error: "You need to login" });
        }

        console.log("🔹 Token found:", token);

        // ✅ Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("🔴 Token verification failed.");
            return res.status(401).json({ error: "Invalid token" });
        }

        console.log("🔹 Token verified. Decoded userId:", decoded.userId);

        // ✅ Fetch user from the database
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            console.log("🔴 User not found in database.");
            return res.status(404).json({ error: "User not found" });
        }

        console.log("🔹 User found:", user);

        // ✅ Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error("❌ Protect Route Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
