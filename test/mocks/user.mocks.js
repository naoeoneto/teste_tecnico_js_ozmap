const userMocked = {
  nome: "raupp",
  email: "jose.raupp@devoz.com.br",
  idade: 35,
};

const userMockedList = [
  {
    nome: "Antonio",
    email: "antonio@mail.com",
    idade: 34,
  },
  {
    nome: "Arthur",
    email: "arthur@mail.com",
    idade: 18,
  },
  {
    nome: "Joyce",
    email: "joyce@mail.com",
    idade: 38,
  },
  {
    nome: "José Carlos Júnior",
    email: "junior@mail.com",
    idade: 29,
  },
  {
    nome: "Bruno",
    email: "bruno@mail.com",
    idade: 37,
  },
];

const userMockedUpdate = {
  idade: 33,
};

const userMockedUnderAge = {
  nome: "Fernando",
  email: "fernando@devoz.com.br",
  idade: 17,
};

const userMockedWrongEmail = {
  nome: "José",
  email: "jose.raupp@devoz.com.br",
  idade: 31,
};

const userMockedMissingData = {
  email: "missing@mail.com",
  idade: 23,
};

const userMockedUpdateId = {
  id: 35,
};

module.exports = {
  userMocked,
  userMockedList,
  userMockedUpdate,
  userMockedUnderAge,
  userMockedWrongEmail,
  userMockedMissingData,
  userMockedUpdateId,
};
