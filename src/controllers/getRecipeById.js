require('dotenv').config();
const {
  URL_API, API_KEY
} = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const getRecipeById = async (idRecipe) => {
  //Si es UUID
  if (isNaN(idRecipe)) {
    const resBdd = await Recipe.findByPk(idRecipe, {
      include: {
        model: Diet,
        attributes: ["id", "name"],
        through: {
          attibutes: [],
        },
      },
    });
    const diets = resBdd.Diets.map((diet) => diet.name);
    return { ...resBdd.toJSON(), diets };
  }
  //Si es ID
  const response = await axios.get(
    `${URL_API}/recipes/${idRecipe}/information?${API_KEY}&addRecipeInformation=true`
  );

  const { id, title, image, healthScore, summary, instructions, diets } =
    response.data;
  if (title)
    return {
      id,
      title,
      image,
      healthscore: healthScore,
      summary,
      instructions,
      diets,
      created: false,
    };
  else throw Error("Receta no encontrada API");
};

module.exports = getRecipeById;
