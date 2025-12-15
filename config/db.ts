import mongoose from "mongoose";
import { buffer } from "node:stream/consumers";

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null}
}

async function connectDB() {
    if (cached.conn){
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands:false
        }

        cached.promise = (mongoose as any).connect(`${process.env.MONGODB_URI}/quickcart`, opts)
        .then((mongoose: any) => {
          return mongoose;
       });

    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB