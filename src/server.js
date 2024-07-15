import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();

const home = (req, res) => {
    return res.send("home");
};

const login = (req, res) => {
    return res.send("login");
};

app.use(morgan("dev"));
app.get("/", home);
app.get("/login", login);

const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT} 🔥`);

app.listen(PORT, handleListening);