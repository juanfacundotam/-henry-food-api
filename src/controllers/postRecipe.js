const {Recipe, Diet} = require("../db");
const { v4: uuidv4 } = require('uuid');
const getRecipeById = require("../controllers/getRecipeById");
const { all } = require("axios");


const postRecipe = async ({title, image, summary, healthscore, instructions, diets}) => {
    const id = uuidv4();
    if(!title || !image || !summary || !healthscore || !instructions || !diets) return res.status(404).send("Faltan datos")
    if(typeof diets[0] === "string"){
        const allDiets = await Diet.findAll();
        const numDiets = allDiets.filter(obj => diets.includes(obj.name)).map(obj => obj.id)
        const newRecipe = await Recipe.create({id, title, image, summary, healthscore, instructions});
        await newRecipe.addDiets(numDiets);

    }else { //por si se crean desde insomia Api client
            const newRecipe = await Recipe.create({id, title, image, summary, healthscore, instructions});
            await newRecipe.addDiets(diets);
    }
    const newRecipeWhitDiets = await getRecipeById(id);
    return newRecipeWhitDiets;
};

module.exports = postRecipe;