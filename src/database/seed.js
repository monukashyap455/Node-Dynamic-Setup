import roleModel from "../model/roleModel.js";
import usersModel from "../model/usersModel.js";
import dataBaseConnection from "./connection.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { dotENVConfig } from "../utils/utils.js";

dotENVConfig()

dataBaseConnection();

const seedData = async () => {
  try {

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(`Kashyap@123`, salt);
    const userData = {
      email: `monukashyap362001@gmail.com`,
      name: `Monu Kashyap`,
      fatherName: `abc`,
      mobileNumber: `+917466960866`,
      dateOfBirth: `01/01/2000`,
      currentAddress: `Noida`,
      gender: `male`,
      password: hashPassword,
      numberVerified: true,
    };
    await usersModel.create(userData);
    console.log("super admin created successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.log("seed error", error);
  }
};

seedData();
