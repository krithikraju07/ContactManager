const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTarce: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTarce: err.stack,
      });
    case constants.UNAUTHORIZED_ERROR:
      res.json({
        title: "Unauthorized error",
        message: err.message,
        stackTarce: err.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden error",
        message: err.message,
        stackTarce: err.stack,
      });
      case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTarce: err.stack,
      });

    default:
        console.log("no  error");
      break;
  }
};
module.exports = errorHandler;
