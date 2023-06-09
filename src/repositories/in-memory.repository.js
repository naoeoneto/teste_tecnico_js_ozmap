// const error = require("../errors/appError");

class InMemoryUserRepository {
  users = [];
  nextId = 1;

  async create(data) {
    const keys = Object.keys(data);

    const findUser = this.users.find((user) => user.email === data.email);
    if (findUser) {
      return [401, { message: "Email already in use" }];
    } else if (data.idade < 18) {
      return [401, { message: "User's age can't be under 18" }];
    } else if (
      !keys.includes("nome") ||
      !keys.includes("email") ||
      !keys.includes("idade")
    ) {
      return [401, { message: "Name, email and age are required fields" }];
    }

    data.id = this.nextId;
    this.nextId++;
    this.users.push(data);
    return [201, data];
  }

  async readAll() {
    return [
      200,
      {
        total: this.users.length,
        count: this.users.length,
        rows: this.users,
      },
    ];
  }

  async readOne(userId) {
    const user = this.users.find((user) => user.id === userId);
    return [200, user];
  }

  async update(userId, data) {
    const keys = Object.keys(data);
    if (keys.includes("id")) {
      return [401, "You can't update id field"];
    }

    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      return [404, user];
    }
    const userIndex = this.users.findIndex((user) => user.id === userId);
    const updatedUser = {
      ...user,
      ...data,
    };
    this.users.splice(userIndex, 1, updatedUser);
    return [200, updatedUser];
  }

  async delete(userId) {
    try {
      const user = this.users.find((user) => user.id === userId);
      if (!user) {
        return [404, user];
      }
      const userIndex = this.users.findIndex((user) => user.id === userId);
      this.users.splice(userIndex, 1);
      return [200, user];
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = InMemoryUserRepository;
