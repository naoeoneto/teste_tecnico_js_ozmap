//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const userRouter = require("./routes/user.routes");
const koa = new Koa();

koa.use(bodyparser());
koa.use(userRouter.routes()).use(userRouter.allowedMethods());

const server = koa.listen(PORT, () => {
  console.log(`Rodando em localhost:${PORT}`);
});

module.exports = server;
