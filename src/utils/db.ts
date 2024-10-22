import mongoose from "mongoose";

// Connect to database
const connectToDabase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL || '', {
        });
        console.log("Database connected successfully");

    } catch(error: any) {
        console.error("Database connection failed:", error.message);
        process.exit(1);

    }
}

export default connectToDabase;