import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../utils/jwtToken.js";

export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({message: "Please fill all fields"});
    }

    try{
        const ExistingUser = await User.findOne({email});
        if(ExistingUser){
            return res.status(400).json({message: "User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, 
            email, 
            password: hashedPassword
        });
        generateJwtToken(res, newUser._id); 

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        })

    } catch(error){
        console.log(error.message);
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
} 

export const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please fill all fields"});
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }
        generateJwtToken(res, user._id);

        res.status(201).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })

    } catch(error){
        console.log(error.message);
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
} 

export const logout = async (req, res)=>{
    try{
        res.clearCookie('jwt');
        res.status(200).json({message: "Logout successful"});
    } catch(error){
        console.log(error.message);
        res.status(500).json({message: "Internal server error"});
    }
    
}

export const checkAuth = async (req, res)=>{
    const user = req.user;
    if(!user){
        return res.status(401).json({message: "Unauthorized"});
    }

    return res.status(200).json({
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    })
}