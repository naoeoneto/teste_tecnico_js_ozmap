const AppError = require("./appError");

async function errorHandler(ctx, next) {
  return next().catch((err) => {
    if (err instanceof AppError) {
      const { statusCode, message } = err;

      ctx.type = "json";
      ctx.status = statusCode || 500;
      ctx.body = {
        status: "error",
        message: message,
      };
      console.log("err", ctx.body);

      // ctx.app.emit("error", err, ctx);
    }
  });
}

module.exports = errorHandler;
