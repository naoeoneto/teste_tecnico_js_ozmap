const InMemoryUserRepository = require("../repositories/in-memory.repository");
const UserService = require("../services/user.services");

const service = new UserService(new InMemoryUserRepository());

class pageController {
  //   users = [
  //     { nome: "Fulano", email: "fulano@mail.com", idade: 19 },
  //     { nome: "Beltrano", email: "beltrano@mail.com", idade: 25 },
  //   ];
  static async createUser(ctx) {}

  static async index(ctx) {
    const users = await service.readAll();
    await ctx.render("index", {
      users: users.rows,
    });
  }
}

module.exports = pageController;
