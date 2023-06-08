//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require("../src/index.js");

const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");
const userSchema = require("./schema/user.schema.js");
const userMocked = require("./mocks/user.mocks.js");
const userMockedList = require("./mocks/userList.mocks.js");
const userAgeMocked = require("./mocks/userAge.mocks.js");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe("Um simples conjunto de testes", function () {
  it("deveria retornar -1 quando o valor não esta presente", function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

//testes da aplicação
describe("Testes da aplicaçao", () => {
  before(() => {
    for (let i = 0; i < 5; i++) {
      chai.request(app).post("/users").send(userMockedList[i]);
    }
  });
  it("o servidor esta online", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("deveria ser uma lista vazia de usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it("deveria criar o usuario raupp", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(userMocked)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("não deveria criar o usuario menor de 18 anos", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(userAgeMocked)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/users/123")
      .end(function (err, res) {
        expect(err.body).to.be.equal("User not found"); //possivelmente forma errada de verificar a mensagem de erro
        expect(res).to.have.status(404);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("o usuario raupp existe e é valido", function (done) {
    chai
      .request(app)
      .get("/users/1")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria excluir o usuario raupp", function (done) {
    chai
      .request(app)
      .delete("/users/1")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("o usuario raupp não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/users/1")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("deveria ser uma lista com pelomenos 5 usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        // expect(res.body.total).to.be.at.least(5);
        expect(res.body.total).to.be.equal(userMockedList);
        done();
      });
  });
});
