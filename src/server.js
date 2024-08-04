import session from "express-session";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import centerRouter from "./routers/centerRouter";
import userRouter from "./routers/userRouter";
import storeRouter from "./routers/storeRouter";
import postRouter from "./routers/postRouter";
import {localsMiddleware} from "./middlewares";

import "./models/User";

dotenv.config();

mongoose.connect(process.env.DB_URL);

const PORT = 4000;
const app = express();
const db = mongoose.connection;

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);

app.set("view engine", "pug");//html대신 pug사용
app.set("views", process.cwd() + "/src/views");

app.use(express.static(path.join(process.cwd(), "src/public")));
app.use(morgan("dev"));
app.use(express.static(process.cwd() + "/src"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", centerRouter);
app.use("/user", userRouter);
app.use("/store", storeRouter);
app.use("/post", postRouter);


const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT} 🔥`);
const handleOpen = () => console.log("✅Connected to DB");
const hanleError = (error) => console.log("❌DB Error", error);

db.once("open", handleOpen);
db.on("error", hanleError);

app.listen(PORT, handleListening);