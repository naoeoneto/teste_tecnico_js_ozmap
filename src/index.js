//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const Router = require("koa-router");
const userRouter = require("./routes/user.routes");
const pageRouter = require("./routes/page.routes");
const errorHandler = require("../src/errors/handleError");
const render = require("koa-ejs");
const path = require("path");

const koa = new Koa();
var router = new Router();

render(koa, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

//rota simples pra testar se o servidor está online
router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

koa.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

koa.use(errorHandler);
koa.on("error", (err, ctx) => {
  console.log(err);
});

koa.use(bodyparser());
koa.use(router.routes()).use(router.allowedMethods());
koa.use(userRouter.routes()).use(userRouter.allowedMethods());
koa.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const server = koa.listen(PORT, () => {
  console.log(`Rodando em localhost:${PORT}`);
});

module.exports = server;
