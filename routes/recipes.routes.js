import { Router } from "express";
import multer from "multer";
import dotenv from "dotenv";
import { multerSaveFilesOrg } from "multer-savefilesorg";
import { addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from "../controllers/recipes.controller.js";
import { checkUserSession } from "../middlewares/auth.middleware.js";

// Load env variables
dotenv.config({ path: ['.env.local'] });

// Configure upload middleware
// const upload = multer({ dest: 'uploads/images' });
const upload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/recipes/images/*'
    }),
    preservePath: true
});

// Create recipes router
const router = Router();

// Apply middlewares
router.use(checkUserSession);

// Define routes
router.post('/', upload.single('image'), addRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipe);

router.patch('/:id', updateRecipe);

router.delete('/:id', deleteRecipe);

// Export router
export default router;