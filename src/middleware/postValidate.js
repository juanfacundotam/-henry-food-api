const postValidate = (req, res, next) => {
    const {title, image, summary, healthscore, instructions, diets} = req.body;
    if(!title || !image || !summary || !healthscore || !instructions || !diets) res.status(400).json({error: "Faltan Datos"});
    next();
};

module.exports = postValidate;