import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const db = mongoose.connection;
        // console.log("db", db)

        db.on("connected", () => {
        console.log("MongoDB connected successfully");
        });

        db.on("error", (err) => {
        console.log(`MongoDB connection error: ${err}`);
        process.exit(1);
        });

    } catch (error) {
        console.log(error);
    }
    }

export default connect;