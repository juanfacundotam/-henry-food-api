const { Router } = require("express");
const router = Router();
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter)



module.exports = router;



