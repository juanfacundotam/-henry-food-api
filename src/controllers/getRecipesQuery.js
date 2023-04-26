require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getRecipeByQuery = async (title) => {
  console.log("entro");
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

  const results = [...recipeBddWithDiets, ...recipeApi];
  if (results.length === 0) throw Error("Recipe not found");

  return results;
};

module.exports = getRecipeByQuery;
