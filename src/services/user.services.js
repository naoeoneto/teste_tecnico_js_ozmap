class UserService {
  constructor(repository) {
    this.userRep = repository; // DependencyInjection
  }

  async createUser(data) {
    return await this.userRep.create(data);
  }

  async readAll() {
    return await this.userRep.readAll();
  }

  async readUser(id) {
    return await this.userRep.readOne(id);
  }

  async updateUser(id, data) {
    return await this.userRep.update(id, data);
  }

  async deleteUser(id) {
    return await this.userRep.delete(id);
  }
}

module.exports = UserService;
