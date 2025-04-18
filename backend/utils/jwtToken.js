import jwt from 'jsonwebtoken';

export const generateJwtToken = (res, id) =>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })

    res.cookie('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
    })
}
