import mongoose  from "mongoose";

const connectDB = async () =>{
    const URI = process.env.MONGO_URI || "mongodb://localhost:27017/flowmodorov2";

    await mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true});

    console.log(`Database connected with URI: ${URI}`);
}


export default connectDB;