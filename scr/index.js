import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";


// dotenv.config({
//     path: './env'
// })


connectDB()




// import Express from "express";
// const app = Express()
//     (async () => {
//         try {
//             await Mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//             app.on("error", (error) => {
//                 console.log("ERROR ", error);
//                 throw error
//             })
//             app.listen(process.env.PORT, () => {
//                 console.log(`App is listen on port ${process.env.PORT}`)
//             })
//         } catch (error) {
//             console.error("ERROR: ", error)
//             throw error
//         }
//     })()