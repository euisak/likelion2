import express from "express";
import { storeNewest, storeFashion, storeEquipment, storeFood, storeDetails } from "../controller.js/storeController";

const storeRouter = express.Router();

storeRouter.get("/newest", storeNewest);
storeRouter.get("/fashion", storeFashion);
storeRouter.get("/equipment", storeEquipment);
storeRouter.get("/food", storeFood);
storeRouter.get("/details", storeDetails);//(/개별id/details로 변경 예정)

export default storeRouter;