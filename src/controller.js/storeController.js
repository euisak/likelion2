export const storeNewest = (req,res)=> {
    return res.render("storeNewest", {pageTitle: "쇼핑 | 최신 상품"});
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
export const storeDetails = (req,res)=> {
    return res.render("storeDetails", {pageTitle: "상품상세"});
}