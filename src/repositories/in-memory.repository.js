class InMemoryUserRepository {
  users = [];
  nextId = 1;

  async create(data) {
    const keys = Object.keys(data);

    const findUser = this.users.find((user) => user.email === data.email);
    if (findUser) {
      // throw new Error("Email já cadastrado");
      return [401, "Email already in use"];
    } else if (data.idade < 18) {
      // throw new Error("Usuário não pode ser menor de 18 anos");
      return [401, "User's can not be under 18"];
    } else if (
      !keys.includes("nome") ||
      !keys.includes("email") ||
      !keys.includes("idade")
    ) {
      // throw new Error("Nome, email e idade são campos obrigatórios");
      return [401, "Name, email and age are required fields"];
    }

    data.id = this._nextId;
    this._nextId++;
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
    if (!user) {
      // throw new Error("Usuário não encontrado", 404);
      return [404, "User not found"];
    }
    return [200, user];
  }

  async update(userId, data) {
    const keys = Object.keys(data);
    if (keys.includes("id")) {
      // throw new Error("Você não pode atualizar o campo id");
      return [401, "You can't update id field"];
    }

    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      // throw new Error("Usuário não encontrado", 404);
      return [404, "User not found"];
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
    const user = this.users.findIndex((user) => user.id === userId);
    if (!user) {
      // throw new Error("Usuário não encontrado", 404);
      return [404, "User not found"];
    }
    this.users.splice(user, 1);
    return [204, "User deleted"];
  }
}

module.exports = InMemoryUserRepository;
