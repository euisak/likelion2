import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    category: {type: String, required: true},
    seller: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number},
    thumbnail: {type: String, required: true},
    productImage: [{type: String, required: true}],
    productDescription: {type: String, required: true},
});

const Store = mongoose.model("Store", storeSchema);
export default Store;