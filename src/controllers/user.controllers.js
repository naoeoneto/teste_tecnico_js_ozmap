const InMemoryUserRepository = require("../repositories/in-memory.repository");
const UserService = require("../services/user.services");

const service = new UserService(new InMemoryUserRepository());

class UserController {
  static async createUser(ctx) {
    const data = ctx.request.body;
    const user = await service.createUser(data);

    if (!user) {
      ctx.throw(400);
    } else {
      ctx.status = 201;
      ctx.body = user;
    }
  }

  static async readAll(ctx) {
    const users = await service.readAll();
    ctx.status = 200;
    ctx.body = users;
  }

  static async readOne(ctx) {
    const user = await service.readUser(+ctx.params.id);
    if (!user) {
      ctx.throw(404);
    } else {
      ctx.status = 200;
      ctx.body = user;
    }
  }

  static async updateUser(ctx) {
    const data = ctx.request.body;
    const user = await service.updateUser(+ctx.params.id, data);

    if (!user) {
      ctx.throw(404);
    } else {
      ctx.status = 200;
      ctx.body = user;
    }
  }

  static async deleteUser(ctx) {
    const user = await service.readUser(+ctx.params.id);

    if (!user) {
      ctx.throw(404);
    } else {
      const user = await service.deleteUser(+ctx.params.id);
      ctx.status = 200;
      ctx.body = user;
    }
  }
}

module.exports = UserController;
