import mongoose from "mongoose";

const connectMongo = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(
      `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbUri}/${process.env.dbOptions}`,
      options as any
    )
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
export default connectMongo;
