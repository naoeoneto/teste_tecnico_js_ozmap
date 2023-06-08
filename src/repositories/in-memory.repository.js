import { AppError } from "src/errors/appError.ts";

export class inMemoryUserRepository {
  users = [];
  nextId = 1;

  async create(data) {
    const keys = Object.keys(data);

    const findUser = this._database.find((user) => user.email === data.email);
    if (findUser) {
      throw new AppError("Email já cadastrado");
    } else if (data.idade < 18) {
      throw new AppError("Usuário não pode ser menor de 18 anos");
    } else if (
      !keys.includes("nome") ||
      !keys.includes("email") ||
      !keys.includes("idade")
    ) {
      throw new AppError("Nome, email e idade são campos obrigatórios");
    }

    data.id = this._nextId;
    this._nextId++;
    this._database.push(data);
    return data;
  }

  async readAll() {
    return {
      total: this._database.length,
      count: this._database.length,
      rows: this._database,
    };
  }

  async readOne(userId) {
    const user = this._database.find((user) => user.id === userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return user;
  }

  async update(userId, data) {
    const keys = Object.keys(data);
    if (keys.includes("id")) {
      throw new AppError("Você não pode atualizar o campo id");
    }

    const user = this._database.find((user) => user.id === userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    const userIndex = this._database.findIndex((user) => user.id === userId);
    const updatedUser = {
      ...user,
      ...data,
    };
    this._database.splice(userIndex, 1, updatedUser);
    return updatedUser;
  }

  async delete(userId) {
    const user = this._database.findIndex((user) => user.id === userId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    this._database.splice(user, 1);
  }
}
