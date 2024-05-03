import { UserModel } from "../models/user.js";
import { RecipeModel } from "../models/recipe.js";

export const addRecipe = async (req, res, next) => {
    try {
        // Add Recipe to the database
        const createResult = await RecipeModel.create({
            ...req.body,
            image: req.file.filename,
            userId: req.session.user.id
        });
        // Return response
        res.status(201).json(createResult);
    } catch (error) {
        // Forward to express error handler
        next(error);
    }
}

export const getRecipes = async (req, res, next) => {
    try {
        // Get all recipes from database
        const findResult = await RecipeModel.find(req.query);
        // Return response
        res.status(200).json(findResult);
    } catch (error) {
        // Forward to express error handler
        next(error);
    }
}

export const getRecipe = async (req, res, next) => {
    try {
        // Get single recipe with id
        const findByIdResult = await RecipeModel.findById(req.params.id);
        // Return 404 if recipe not found
        if (findByIdResult === null) {
            return res.status(404).json({
                message: `Recipe with ObjectId: ${req.params.id} Not Found!`
            });
        }
        // Return response
        res.status(200).json(findByIdResult);
    } catch (error) {
        // Forward to express error handler
        next(error);
    }
}

export const updateRecipe = (req, res) => {
    res.send('Update single recipe');
}

export const deleteRecipe = (req, res) => {
    res.send('Delete single recipe');
}