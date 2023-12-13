import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aza-e-hussain:cz9Am1Y4VJHrf8ZY@cluster0.oakgoec.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
