const appError = require("./appError");

const errorHandler = (err, res) => {
  // console.log(err.message);
  if (err instanceof appError) {
    return res.status(err.statusCode).json(err.message);
  }

  res.status(500).json({ message: "Internal Server Error." });
};

module.exports = errorHandler;
