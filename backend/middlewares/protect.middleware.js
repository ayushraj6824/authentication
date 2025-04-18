import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    const {jwt : token} = req.cookies;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
}