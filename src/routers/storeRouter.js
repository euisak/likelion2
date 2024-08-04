import express from "express";
<<<<<<< HEAD
import { storeBest, storeFashion } from "../controller.js/storeController";

const storeRouter = express.Router();

storeRouter.get("/best", storeBest);
storeRouter.get("/fashion", storeFashion);
=======
import { storeNewest, storeFashion, storeEquipment, storeFood, storeDetails } from "../controller.js/storeController";

const storeRouter = express.Router();

storeRouter.get("/newest", storeNewest);
storeRouter.get("/fashion", storeFashion);
storeRouter.get("/equipment", storeEquipment);
storeRouter.get("/food", storeFood);
storeRouter.get("/details", storeDetails);//(/개별id/details로 변경 예정)
>>>>>>> 1e458b7a25ed3153b5ef817c98ded00b3959e9dd

export default storeRouter;