const InMemoryUserRepository = require("../repositories/in-memory.repository");
const UserService = require("../services/user.services");

const service = new UserService(new InMemoryUserRepository());

class pageController {
  static async index(ctx) {
    const users = await service.readAll();
    await ctx.render("index", {
      users: users.rows,
    });
  }

  static async addPage(ctx) {
    await ctx.render("register");
  }

  static async register(ctx) {
    await service.createUser(ctx.request.body);
    ctx.redirect("/index");
  }
}

module.exports = pageController;
