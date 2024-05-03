import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "errorhandler";
import cookieSession from "cookie-session";
import usersRoutes from "./routes/users.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";

// Load env variables
dotenv.config({ path: ['.env.local'] });

// Create express app
const app = express();

// Apply middlewares
app.use(cookieSession({
    secret: process.env.SESSION_SECRET,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.static('uploads'));

// Use routes
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);

// User errorHandler
app.use(errorHandler({ log: false }));

// Make database connection
await mongoose.connect(process.env.MONGO_URI);

// Listen for incoming requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Express app is running on PORT: ${port}!`);
});