const { Recipe } = require("../db");

const deleteRecipe = async (id) => {
    const recipe = await Recipe.findOne({where: {id: id}});
    const aux = recipe
    await recipe.destroy();
    return aux;

};

module.exports = deleteRecipe;
