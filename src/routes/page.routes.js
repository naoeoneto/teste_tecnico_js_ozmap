// const render = require("koa-ejs");
// const path = require("path");
const Router = require("koa-router");
const pageController = require("../controllers/page.controllers");

const pageRouter = new Router();

pageRouter.get(
  "/app",
  pageController.index
  // async (ctx) => {
  //   await ctx.render("index", {
  //     users: users,
  //   });
  // }
);

pageRouter.get("/add", async (ctx) => {
  await ctx.render("addUser");
});

module.exports = pageRouter;
