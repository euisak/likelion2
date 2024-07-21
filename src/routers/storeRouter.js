import express from "express";
import { storeBest, storeFashion } from "../controller.js/storeController";

const storeRouter = express.Router();

storeRouter.get("/best", storeBest);
storeRouter.get("/fashion", storeFashion);

export default storeRouter;