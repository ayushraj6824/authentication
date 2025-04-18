import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

const User = mongoose.model('User', userSchema);
export default User;