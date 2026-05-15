import mongoose from "mongoose";
import { config } from "./config.js";

const connectDb = async () => {
    try {

        const connection = await mongoose.connect(config.mongo_url);

        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {

        console.log("MongoDB Connection Failed", error.message);

        process.exit(1);
    }
}

export default connectDb;