export const mySales = (req,res)=> {
    return res.render("mySales", {pageTitle: "나의 판매"});
}

//[상품 등록]
export const getProductReg = (req,res)=> {
    return res.render("productReg", {pageTitle: "상품 등록"});
}

export const postProductReg = (req,res)=> {
    const {thumbnail, productImage} = req.files;
    console.log(thumbnail, productImage);
}