require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeByQuery = async (title) => {
  const recipeBdd = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
    include: {
      model: Diet,
      attributes: ["id", "name"],
      through: {
        attibutes: [],
      },
    },
  });
  
  const recipeBddMaped = recipeBdd.map((recipe) => recipe.dataValues);
  const recipeBddWithDiets = recipeBddMaped.map((recipe) => {
    const result = {
      ...recipe,
      diets: recipe.Diets.flatMap((diet) => diet.name),
    };
    return result;
  });
  
  let recipeApi = await axios.get(
    `${URL_API}/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&query=${title}`
    );
    
    recipeApi = recipeApi.data.results;
    const recipeMaped = recipeApi.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        healthscore: recipe.healthScore,
        summary: recipe.summary,
        instructions: recipe.instructions,
        diets: recipe.diets,

      }
    })
    console.log(recipeMaped)
    const results = [...recipeBddWithDiets, ...recipeMaped];
    if (results.length === 0) throw Error("Recipe not found");
    
  return results;
};

module.exports = getRecipeByQuery;
