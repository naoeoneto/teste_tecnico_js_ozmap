const InMemoryUserRepository = require("../repositories/in-memory.repository");
const UserService = require("../services/user.services");

const service = new UserService(new InMemoryUserRepository());

class UserController {
  static async createUser(ctx) {
    const data = ctx.request.body;
    const [status, user] = await service.createUser(data);
    ctx.status = status;
    ctx.body = user;

    // if (!user) {
    //   ctx.throw(401);
    // } else {
    //   ctx.status = status;
    //   ctx.body = user;
    // }
  }

  static async readAll(ctx) {
    const [status, users] = await service.readAll();
    ctx.status = status;
    ctx.body = users;
  }

  static async readOne(ctx) {
    const userId = +ctx.params.id;
    const [status, user] = await service.readUser(userId);
    if (!user) {
      console.log("entrou");
      ctx.throw(404, "User not found");
    } else {
      ctx.status = status;
      ctx.body = user;
    }
  }

  static async updateUser(ctx) {
    const userId = +ctx.params.id;
    const data = ctx.request.body;
    const [status, user] = await service.updateUser(userId, data);

    if (!user) {
      ctx.throw(404, "User not found");
    } else {
      ctx.status = status;
      ctx.body = user;
    }
  }

  static async deleteUser(ctx) {
    const userId = +ctx.params.id;
    const user = await service.readUser(userId);

    if (!user) {
      ctx.throw(404, "User not found");
    } else {
      const [status, user] = await service.deleteUser(userId);
      ctx.status = status;
      ctx.body = user;
    }
  }
}

module.exports = UserController;
