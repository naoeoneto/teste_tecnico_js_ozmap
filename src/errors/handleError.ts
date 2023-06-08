const AppError = require("./appError");

export const handleError = async (error: Error, ctx: any) => {
  if (error instanceof AppError) {
    // return ctx.status(error.statusCode).json({
    //   message: error.message,
    // });
  }
  console.log(error.message);
  return ctx.status(500).json({ message: "Internal server error!" });
};
