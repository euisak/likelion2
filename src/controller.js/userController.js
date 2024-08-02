import User from "../models/User";
import Store from "../models/Store";

//[로그아웃]
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

//[마이페이지]
export const seeUser = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    //user를 찾을 수 없다면
    if(!user){
        return res.render("404", {pageTitle: "404"});
    }
    return res.render("myprofile", {pageTitle: "마이프로필", user});
}

//[마이페이지 수정]
export const editUser = (req,res) => {
    return res.send("users", {pageTitle: "프로필 수정"});
}

//[상품 등록]
export const getProductReg = async (req,res)=> {
    const id = req.params.id;
    const user = await User.findById(id);
    //user를 찾을 수 없다면
    if(!user){
        return res.render("404", {pageTitle: "404"});
    }
    return res.render("productReg", {pageTitle: "상품 등록", user});
}

export const postProductReg = async(req,res)=> {
    const id = req.session.user._id;
    const {thumbnail, productImage} = req.files;
    console.log(thumbnail, productImage);
    const {productName, category, seller, price, discount, productDescription} = req.body;
    const today = new Date();
    try{
        const newProduct = await Store.create({
            thumbnail: thumbnail[0].path.replace(/\\/g, '/'),
            productImage: productImage.map(img => img.path.replace(/\\/g, '/')),
            productName: productName,
            category: category,
            seller: seller,
            price: price,
            discount: discount,
            productDescription: productDescription,
            createdAt: Store.createAtSave(today),
            owner: id,
        });
        const user = await User.findById(id);
        user.products.push([newProduct._id]);
        await user.save();
        return res.redirect("/store/newest");
    }catch(error){
        console.log(error);
        return res.status(400).render("productReg", {pageTitle: "상품 등록"});
    }
}

//[나의 판매]
export const mySales = async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    //user를 찾을 수 없다면
    if(!user){
        return res.render("404", {pageTitle: "404"});
    }
    return res.render("mySales", {pageTitle: "나의 판매", user});
}