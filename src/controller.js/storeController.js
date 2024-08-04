import Store from "../models/Store";

//[상품 등록(최신 상품 나열)]
export const storeNewest = async(req,res)=> {
    try{
        const products = await Store.find({}).sort({createdAt: "desc"});
        return res.render("storeNewest", {pageTitle: "쇼핑 | 최신 상품", products});
    }catch(error){
        console.error("Error fetching posts:", error);
        return res.render("storeNewest", { pageTitle: "쇼핑 | 최신 상품", products: [] });
    }
}

export const storeFashion = (req,res)=> {
    return res.render("storeFashion", {pageTitle: "쇼핑 | 패션"});
}
export const storeEquipment = (req,res)=> {
    return res.render("storeEquipment", {pageTitle: "쇼핑 | 기구"});
}
export const storeFood = (req,res)=> {
    return res.render("storeFood", {pageTitle: "쇼핑 | 식품"});
}
export const storeDetails = async (req,res)=> {
    const id = req.params.id;
    const product = await Store.findById(id);
    const productImage = product.productImage.map(product => {return product});
    if(!product){
        return res.status(404).render("404", {pageTitle: "404"});
    }
    return res.render("storeDetails", {pageTitle: product.productName, product, productImage});
}