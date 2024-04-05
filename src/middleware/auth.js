import jwt from "jsonwebtoken";

import usersModel from "../model/usersModel.js";
import { AppError } from "../controller/errorController.js";
import { ROLE_NAME } from "../constant/constant.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization === undefined || authorization === null) {
      return next(new AppError("Not Authorized", 401));
    }

    const token = authorization.replace("Bearer ", "");
    const verifyTokenKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, verifyTokenKey);

    const user = await usersModel
      .findOne({ _id: decoded._id })
      .populate("roleId")
      .lean();

    if (!user) {
      res.status(401).json({ status: 401, message: "not authorized" });
      return;
    }


    req.role = user.roleId;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ statusCode: 401, message: "not authorized", error });
  }
};

export const checkPermission = async (req, res, next) => {
  if (ROLE_NAME.superAdmin === req.role.name) {
    return next();
  }
  return next(new AppError("Not allowed!", 401));
};
