const {Router} = require("express");
const dietsRouter = Router();
const {getAllDietsHandler} = require("../Handlers/dietHandlers")


dietsRouter.get("/", getAllDietsHandler);

module.exports = dietsRouter;
