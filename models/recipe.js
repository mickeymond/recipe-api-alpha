import { Schema, Types, model } from "mongoose";

const recipeSchema = new Schema({
    userId: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    country: { type: String },
}, { timestamps: true });

export const RecipeModel = model('Recipe', recipeSchema, 'recipes');