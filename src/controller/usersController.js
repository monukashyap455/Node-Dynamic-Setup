import { serverResponse, } from "../utils/appError.js";
import usersModel from "../model/usersModel.js";
import { generateOTP, addMinutes } from "../helper/nessoryFunction.js";
import otpModel from "../model/otpModel.js";
import { AppError } from "../utils/appError.js";
import { errorMessages, statusCode } from '../helper/constants.js';
import { hashPassword } from "../helper/nessoryFunction.js";
import { createUser } from "../dao/userDao.js";
import { sendSms } from "../utils/nodeMailer.js"


export const registerController = async (req, res, next) => {

  const { password, email, mobileNumber } = req.body;
  const userExist = await usersModel.exists({ email });
  const mobileNumberExist = await usersModel.exists({ mobileNumber });

  if (userExist) {
    return next(new AppError(errorMessages.MESSAGE_EMAIL_ALREADY, statusCode.BAD_REQUEST));
  }

  if (mobileNumberExist) {
    return next(new AppError(errorMessages.MESSAGE_MOBILE_ALREADY, statusCode.BAD_REQUEST));
  }

  const hashP = await hashPassword(password);
  const data = await createUser({
    ...req.body,
    password: hashP,
  });

  // const otp = generateOTP();
  // const messageBody = `Verification otp for testing ${otp}`;
  // await createNow(otpModel)({
  //   userId: data._id,
  //   otp,
  //   expireTime: addMinutes(new Date(), 5),
  // });
  // await sendSms(mobileNumber, messageBody, otp);

  serverResponse(
    res,
    201,
    "User register pending please verify OTP!",
    data,
  );
};


export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersModel
    .findOne({ email })
    .select("+password")
    .populate(`roleId`)
    .lean();

  if (!user) {
    return serverResponse(res, 400, "user not exits");
  }

  if (!user.numberVerified) {
    return serverResponse(res, 400, "mobile number not verify");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return serverResponse(res, 400, "password not match!");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  delete user.password;

  serverResponse(res, 200, "user login successfully!", {
    token,
    ...user,
  });
};

