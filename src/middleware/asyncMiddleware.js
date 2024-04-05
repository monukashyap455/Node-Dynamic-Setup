import { AppError } from "../utils/appError.js";

const asyncMiddleware = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    next(new AppError(error, 400));
  });

export default asyncMiddleware;
