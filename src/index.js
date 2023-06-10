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
const errorHandler = require("../src/errors/handleError");
// const swagger = require("koa2-swagger-ui");
const yamljs = require("yamljs");
const swagger = require("swagger2");
const koaSwagger = require("swagger2-koa");

// const docs = new Router({ prefix: "/" });
const koa = new Koa();
var router = new Router();
// const spec = yamljs.load("api.yml");
const swaggerDocument = swagger.loadDocumentSync("./swagger.yml");
// var swagger = require("swagger-koa");

// koa.use(
//   swagger.init({
//     apiVersion: "1.0",
//     swaggerVersion: "1.0",
//     swaggerURL: "/swagger",
//     swaggerJSON: "/swagger.json",
//     swaggerUI: "./public/swagger/",
//     basePath: "http://localhost:3000",
//     info: {
//       title: "swagger-koa sample app",
//       description: "Swagger + Koa = {swagger-koa}",
//     },
//     apis: ["./api.yml"],
//   })
// );

//rota simples pra testar se o servidor está online
router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

// docs.get(
//   "/swagger",
//   swagger.koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
// );

koa.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
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
if (!swagger.validateDocument(swaggerDocument)) {
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
}

koa
  // .use(koaSwagger.router(swaggerDocument, "/swagger"))
  .use(koaSwagger.validate(swaggerDocument));

koa.use(bodyparser());
// koa.use(docs.routes()).use(docs.allowedMethods());
koa.use(router.routes()).use(router.allowedMethods());
koa.use(userRouter.routes()).use(userRouter.allowedMethods());

const server = koa.listen(PORT, () => {
  console.log(`Rodando em localhost:${PORT}`);
});

module.exports = server;
