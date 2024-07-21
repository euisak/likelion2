import express from "express";
import morgan from "morgan";
import centerRouter from "./routers/centerRouter";
import userRouter from "./routers/userRouter";
import storeRouter from "./routers/storeRouter";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");//html대신 pug사용
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.static(process.cwd() + "/src"));
app.use("/", centerRouter);
app.use("/user", userRouter);
app.use("/store", storeRouter);


const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT} 🔥`);

app.listen(PORT, handleListening);