// const render = require("koa-ejs");
// const path = require("path");
const Router = require("koa-router");
const pageController = require("../controllers/page.controllers");

const pageRouter = new Router();

pageRouter.get("/index", pageController.index);

pageRouter.get("/register", pageController.addPage);

pageRouter.post("/register", pageController.register);

module.exports = pageRouter;
