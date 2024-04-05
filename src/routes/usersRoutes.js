import express from "express";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import validateSchema from "../middleware/validationMiddleware.js";
import { registerController, } from "../controller/usersController.js";
import { studentRegisterSchema, } from "../utils/validationSchema.js";

const router = express.Router();


router.post(
  "/register",
  validateSchema(studentRegisterSchema),
  asyncMiddleware(registerController)
);

export default router;
