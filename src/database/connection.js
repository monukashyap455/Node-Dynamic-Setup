import mongoose from "mongoose";

const dataBaseConnection = async () => {
  try {
    const uri =
      Number(process.env.STATUS) === 1
        ? process.env.DATABASE_URI_PRODUCTION
        : process.env.DATABASE_URI_DEVELOPMENT;
    const env = Number(process.env.STATUS) === 1 ? `prod` : `dev`;

    await mongoose.connect(uri);
    console.log(`Database connected successfully on ${env} envirement`);
  } catch (error) {
    console.log("Database error", error);
  }
};

export default dataBaseConnection;
