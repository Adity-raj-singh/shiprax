import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.tllekjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Databse connected successfully");
    }
    catch (error) {
        console.log("Error while connecting with databse", error);
    }
}

export default Connection;