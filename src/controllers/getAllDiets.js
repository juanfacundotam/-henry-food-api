require('dotenv').config();
const {
  URL_API, API_KEY
} = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const getAllDiets = async () => {
  const writed = await Diet.findAll();
  
  //if para que solo se carguen una vez
  if (!writed.length) {
    // const response = await axios.get(`${URL_API}/recipes/complexSearch?${API_KEY}&addRecipeInformation=true`);
    const response = await axios.get(
      "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    );
    const diets = response.data.results.map((elem) => elem.diets);
    const allDiets = diets.flat(Infinity);
    const results = [...new Set(allDiets)];
    results.forEach((elem) => {
      Diet.create({ name: elem });
    });
    return results;
  }

  return writed;
};

module.exports = getAllDiets;

// "gluten free",
// "dairy free",
// "lacto ovo vegetarian",
// "vegan",
// "paleolithic",
// "primal",
// "whole 30"

// "gluten free",
// "dairy free",
// "lacto ovo vegetarian",
// "vegan",
// "paleolithic",
// "primal",
// "whole 30",
// "pescatarian",
// "ketogenic",
// "fodmap friendly"
