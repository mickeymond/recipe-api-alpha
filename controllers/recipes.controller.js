import { RecipeModel } from "../models/recipe.js";

export const addRecipe = async (req, res) => {
    // Add Recipe to the database
    const createResult = await RecipeModel.create(req.body);
    // Return response
    res.json(createResult);
}

export const getRecipes = (req, res) => {
    res.send('Get all recipes');
}

export const getRecipe = (req, res) => {
    res.send('Get single recipe');
}

export const updateRecipe = (req, res) => {
    res.send('Update single recipe');
}

export const deleteRecipe = (req, res) => {
    res.send('Delete single recipe');
}