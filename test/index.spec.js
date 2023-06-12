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
const mocks = require("./mocks/user.mocks.js");
const AppError = require("../src/errors/appError.js");

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
      .send(mocks.userMocked)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });
  it("deveria criar cinco usuarios", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedList[0])
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
      });
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedList[1])
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
      });
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedList[2])
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
      });
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedList[3])
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
      });
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedList[4])
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("não cria usuário menor de 18 anos", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedUnderAge)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("não cria usuário com email cadastrado", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedWrongEmail)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("não cria usuário sem todas as informações necessárias", function (done) {
    chai
      .request(app)
      .post("/users")
      .send(mocks.userMockedMissingData)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("não cria usuário sem nenhuma informação", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({})
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("não lista usuário inexistente no sistema", function (done) {
    chai
      .request(app)
      .get("/users/123")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
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

  it("deveria atualizar o usuario raupp", function (done) {
    chai
      .request(app)
      .patch("/users/1")
      .send(mocks.userMockedUpdate)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("não permite que usuário atualize id", function (done) {
    chai
      .request(app)
      .patch("/users/1")
      .send(mocks.userMockedUpdateId)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("não atualiza usuário inexistente no sistema", function (done) {
    chai
      .request(app)
      .patch("/users/123")
      .send(mocks.userMockedUpdate)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
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
        expect(res.body.total).to.be.equal(5);
        done();
      });
  });
});
