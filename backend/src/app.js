import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname, '../public');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// this use for cross origin sharing 
app.use(cors({ origin: ["http://localhost:5173", process.env.CORS_ORIGIN], credentials: true }));
// this middleware use for parsing the json data
app.use(express.json());
// this is used for parsing url data extended is used for nessted object
app.use(express.urlencoded({ extended: true }));
// this is used for accessing public resources from server
app.use(express.static(staticPath));
// this is used to parse the cookie
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js';
import emailRouter from './routes/email.routes.js';
import videoRouter from './routes/video.routes.js';


//Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/video", videoRouter);

// Custom error handeling
app.use((err, _, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        statusCode: statusCode,
        message: message
    });
})

export default app