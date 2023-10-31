import { connect } from "mongoose";

const ConnectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);

    console.log("MongoDB connected SUCCESS");
  } catch (error) {
    console.error("MongoDB connected FAIL");
    process.exit(1);
  }
};

export default ConnectDB;
