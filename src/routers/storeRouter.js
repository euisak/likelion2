import express from "express";
import { storeNewest, storeFashion, storeEquipment, storeFood } from "../controller.js/storeController";

const storeRouter = express.Router();

storeRouter.get("/newest", storeNewest);
storeRouter.get("/fashion", storeFashion);
storeRouter.get("/equipment", storeEquipment);
storeRouter.get("/food", storeFood);

export default storeRouter;