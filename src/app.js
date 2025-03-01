import express, { text } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/users.routes.js"
import files from './routes/files.routes.js';
import texts from './routes/text.routes.js';
const app = express()

app.use(cors({
    origin: 'https://safe-sync.netlify.app', 
    credentials: true
}));



app.use(express.json({limit: "16mb"}))
app.use(express.urlencoded({extended: true, limit: "16mb"}))
// app.use(express.static("public"))
app.use(cookieParser())


// Register the routes
app.use('/users', userRouter);
app.use('/files', files);
app.use('/text', texts);

export { app };
