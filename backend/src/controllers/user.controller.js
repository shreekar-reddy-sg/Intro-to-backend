import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existing = await User.findOne({ email });
        if(existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if(!await user.comparePassword(password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
        } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { 
    loginUser,
    registerUser 
};