const InMemoryUserRepository = require("../repositories/in-memory.repository");
const UserService = require("../services/user.services");

const service = new UserService(new InMemoryUserRepository());

class UserController {
  static async createUser(ctx) {
    const data = ctx.request.body;
    const user = await service.createUser(data);

    if (!user) {
      ctx.throw(401);
    } else {
      ctx.status = 201;
      ctx.body = user;
    }
  }

  static async readAll(ctx) {
    ctx.status = 200;
    ctx.body = await service.readAll();
  }

  static async readOne(ctx) {
    const userId = +ctx.params.id;
    const user = await service.readUser(userId);

    if (!user) {
      ctx.throw(404, "Usuário não encontrado");
    } else {
      ctx.status = 200;
      ctx.body = user;
    }
  }

  static async updateUser(ctx) {
    const userId = +ctx.params.id;
    const data = ctx.request.body;
    const user = await service.updateUser(userId, data);

    if (!user) {
      ctx.throw(404, "Usuário não encontrado");
    } else {
      ctx.status = 200;
      ctx.body = user;
    }
  }

  static async deleteUser(ctx) {
    const userId = +ctx.params.id;
    const user = await service.readUser(userId);

    if (!user) {
      ctx.throw(404, "Usuário não encontrado");
    } else {
      await service.deleteUser(userId);
      ctx.status = 204;
      ctx.body = user;
    }
  }
}

module.exports = UserController;
