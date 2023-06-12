const Router = require("koa-router");
const UserController = require("../controllers/user.controllers");
const swagger = require("koa2-swagger-ui");
const yamljs = require("yamljs");

const userRouter = new Router();
const spec = yamljs.load("./openapi.yaml");

userRouter.get(
  "/swagger",
  swagger.koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);

userRouter.post("/users", UserController.createUser);

userRouter.get("/users", UserController.readAll);

userRouter.get("/users/:id", UserController.readOne);

userRouter.patch("/users/:id", UserController.updateUser);

userRouter.delete("/users/:id", UserController.deleteUser);

module.exports = userRouter;
