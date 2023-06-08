const Router = require("koa-router");
const UserController = require("../controllers/user.controllers");

const userRouter = new Router();

userRouter.post("/users", UserController.createUser);

userRouter.get("/users", UserController.readAll);

userRouter.get("/users/:id", UserController.readOne);

userRouter.patch("/users/:id", UserController.updateUser);

userRouter.delete("/users/:id", UserController.deleteUser);

module.exports = userRouter;
