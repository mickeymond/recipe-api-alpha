import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.js";

export const register = async (req, res, next) => {
    try {
        // Get request body
        const { fullName, email, password } = req.body;
        // Generate salt for hashing
        const salt = bcrypt.genSaltSync(10);
        // Hash password
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Save user document to database
        await UserModel.create({ fullName, email, password: hashedPassword });
        // Return response
        res.status(201).json("User registered successfully!");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        // Get request body
        const { email, password } = req.body;
        // Find user with email
        const findOneResult = await UserModel.findOne({ email });
        if (!findOneResult) {
            return res.status(404).json("User not found with provided email!");
        }
        // Compare password
        const validPassword = bcrypt.compareSync(password, findOneResult.password);
        if (!validPassword) {
            return res.status(401).json("Invalid password provided for user!");
        }
        // Update user session
        req.session.user = { id: findOneResult.id }
        // Return response
        res.status(200).json("User login successful!");
    } catch (error) {
        next(error);
    }
}

export const profile = async (req, res, next) => {
    try {
        // Find user by id
        const findByIdResult = await UserModel.findById(req.session.user.id).select({ password: 0 });
        if (!findByIdResult) {
            return res.status(401).json("Session user not found in database!");
        }
        // Return response
        res.status(200).json(findByIdResult);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        // Destroy user session
        req.session = null;
        // Return response
        res.status(200).json("User logout successful!");
    } catch (error) {
        next(error);
    }
}