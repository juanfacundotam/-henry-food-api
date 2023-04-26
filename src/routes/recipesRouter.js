const {Router} = require("express");
const recipesRouter = Router();
const {getRecipesIdHandler, getRecipesQueryHandler, postRecipesHandler, deleteRecipesHandler, updateRecipeHandler} = require("../Handlers/recipesHandlers");
const postValidate = require("../middleware/postValidate")

recipesRouter.get("/", getRecipesQueryHandler);
recipesRouter.post("/", postValidate, postRecipesHandler);
recipesRouter.put("/:idRecipe", postValidate, updateRecipeHandler);
recipesRouter.get("/:idRecipe", getRecipesIdHandler);
recipesRouter.delete("/:idRecipe", deleteRecipesHandler);



module.exports = recipesRouter;