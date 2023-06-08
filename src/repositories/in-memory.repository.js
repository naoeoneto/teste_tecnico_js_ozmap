class InMemoryUserRepository {
  users = [];
  nextId = 1;

  async create(data) {
    const keys = Object.keys(data);

    const findUser = this.users.find((user) => user.email === data.email);
    if (findUser) {
      throw new Error("Email já cadastrado");
    } else if (data.idade < 18) {
      throw new Error("Usuário não pode ser menor de 18 anos");
    } else if (
      !keys.includes("nome") ||
      !keys.includes("email") ||
      !keys.includes("idade")
    ) {
      throw new Error("Nome, email e idade são campos obrigatórios");
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
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found", 404);
    }
    return user;
  }

  async update(userId, data) {
    const keys = Object.keys(data);
    if (keys.includes("id")) {
      throw new Error("Você não pode atualizar o campo id");
    }

    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found", 404);
    }
    const userIndex = this.users.findIndex((user) => user.id === userId);
    const updatedUser = {
      ...user,
      ...data,
    };
    this.users.splice(userIndex, 1, updatedUser);
    return updatedUser;
  }

  async delete(userId) {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found", 404);
    }

    const userIndex = this.users.findIndex((user) => user.id === userId);

    this.users.splice(userIndex, 1);
  }
}

module.exports = InMemoryUserRepository;
