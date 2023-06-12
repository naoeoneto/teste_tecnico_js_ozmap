const AppError = require("../errors/appError");

class HtmlRepository {
  users = [];
  nextId = 1;

  async create(data) {
    const keys = Object.keys(data);

    const findUser = this.users.find((user) => user.email === data.email);
    if (findUser) {
      throw new AppError("Email already in use");
    } else if (data.idade < 18) {
      throw new AppError("User's age can't be under 18");
    } else if (
      !keys.includes("nome") ||
      !keys.includes("email") ||
      !keys.includes("idade")
    ) {
      throw new AppError("Name, email and age are required fields");
    }

    data.id = this.nextId;
    this.nextId++;
    this.users.push(data);
    return data;
  }

  async readAll() {
    return {
      total: this.users.length,
      count: this.users.length,
      rows: this.users,
    };
  }

  async readOne(userId) {
    // const user = this.users.find((user) => user.id === userId);
    // if (!user) {
    //   throw new AppError("User not found", 404);
    // }
    return user;
  }

  async update(userId, data) {
    const keys = Object.keys(data);
    if (keys.includes("id")) {
      throw new AppError("You can't update id field");
    }

    // const user = this.users.find((user) => user.id === userId);
    // if (!user) {
    //   throw new AppError("User not found", 404);
    // }

    const userIndex = this.users.findIndex((user) => user.id === userId);
    const updatedUser = {
      ...user,
      ...data,
    };
    this.users.splice(userIndex, 1, updatedUser);
    return updatedUser;
  }

  async delete(userId) {
    // const user = this.users.find((user) => user.id === userId);
    // if (!user) {
    //   throw new AppError("User not found");
    // }

    const userIndex = this.users.findIndex((user) => user.id === userId);
    this.users.splice(userIndex, 1);
    return user;
  }
}

module.exports = HtmlRepository;
