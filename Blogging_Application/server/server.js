import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import authRoute from './routes/authRotes.js'
import cors from 'cors';


const server = express()
const port = 3000

server.use(express.json());
server.use(cors());
dotenv.config();
connectDb();


server.use('/',authRoute)


server.use(errorMiddleware);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})