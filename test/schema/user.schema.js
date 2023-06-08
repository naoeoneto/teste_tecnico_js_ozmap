//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ["nome", "email", "idade"],
  properties: {
    id: {
      type: "number",
    },
    nome: {
      type: "string",
    },
    email: {
      type: "string",
    },
    idade: {
      type: "number",
      minimum: 18,
    },
  },
};

module.exports = userSchema;
