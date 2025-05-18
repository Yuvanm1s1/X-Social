// import User from "../models/user.model.js";
// import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
// import bcrypt from "bcryptjs"; // ✅ Import bcryptjs
// export const signup = async (req,res)=>{
//     try{
//         const {fullname,username,email,password} = req.body;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res. status(400).json({ error: "Invalid email format" });
//         }
//         const existingUser = await User.findOne({username:username});
//         if(existingUser){
//             return res. status(400).json({ error: "existing user" });
//         }
//         const existingEmail = await User.findOne({username:username});
//         if(existingEmail){
//             return res. status(400).json({ error: "existing email" });
//         }
//         const salt = await bcrypt.getSalt(10);
//         const hashedPassword = await bcrypt.hash(password,salt);
//         const newUser = new User({
//             fullname:fullname,
//             username:username,
//             email,
//             password:hashedPassword,
//         })
//         if(newUser){
//             generateTokenAndSetCookie(newUser._id,res)
//             await newUser.save();
//             res.status(201).json({
//                 _id:newUser._id,
//                 fullName:newUser.fullName,
//                 email:newUser.email,
//                 followers:newUser.followers,
//                 following:newUser.following,
//                 profileImg:newUser.profileImg,
//                 coverImg:newUser.coverImg,
//             })
//         } else{
//             res.status(400).json({error:"Invalid User Data"})
//         }

//     }catch(error){
//         res.status(400).json({error:"Internal server error"})
//     }
// }

// export const login = async (req,res)=>{
//     res.json({data:"You have hit the login endpoint"})
// }

// export const logout = async (req,res)=>{
//     res.json({data:"You have hit the logout endpoint"})
// }


import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs"; // ✅ Import bcryptjs

export const signup = async (req, res) => {
    try {
        // ✅ Log incoming request data for debugging
        console.log("Incoming Data:", req.body);

        const { fullName, username, email, password } = req.body;

        // ✅ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // ✅ Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // ✅ Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // ✅ Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // ✅ Create new user
        const newUser = new User({
            fullName: fullName,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // ✅ Generate JWT Token
        generateTokenAndSetCookie(newUser._id, res);

        // ✅ Respond with user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        });

    } catch (error) {
        console.error("❌ Signup Error:", error); // ✅ Log error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};

//✅ Login Controller
export const login = async (req, res) => {
    try {
        console.log("Incoming Login Data:", req.body); // ✅ Log request

        const { email, password } = req.body;

        // ✅ Find user by email
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Check password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Generate JWT Token
        generateTokenAndSetCookie(user._id, res);

        // ✅ Respond with user data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// export const login = async (req, res) => {
//     try {
//         console.log("🔹 Incoming Login Request:", req.body); 

//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log("🔴 Missing email or password");
//             return res.status(400).json({ error: "Email and password are required" });
//         }

//         console.log("🔹 Finding user with email:", email);
        
//         const user = await User.findOne({ email });

//         if (!user) {
//             console.log("🔴 User not found:", email);
//             return res.status(400).json({ error: "Invalid email or password" });
//         }

//         console.log("🔹 User found. Checking password...");

//         // ✅ Change `compareSync` to `await compare`
//         const isMatch = await bcrypt.compare(password, user.password);

//         console.log("🔹 Password match result:", isMatch);

//         if (!isMatch) {
//             console.log("🔴 Password does not match");
//             return res.status(400).json({ error: "Invalid email or password" });
//         }

//         console.log("🔹 Password matched. Generating token...");
//         generateTokenAndSetCookie(user._id, res);

//         console.log("✅ Login successful!");
//         res.status(200).json({ message: "Login successful" });

//     } catch (error) {
//         console.error("❌ Login Error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };



// ✅ Logout Controller
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // ✅ Clear the JWT cookie
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("❌ Logout Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMe = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);//we added user to req in protectRoute which has id,email,username etc
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username, 
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });
    }catch(error){
        console.error("❌ GetMe Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
