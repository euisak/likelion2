<<<<<<< HEAD
export const seeUser = (req,res) => res.send("myPage");
export const editUser = (req,res) => res.send("users");
=======
//[로그아웃]
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const seeUser = (req,res) => {
    return res.send("myPage", {pageTitle: "마이프로필"});
}
export const editUser = (req,res) => {
    return res.send("users", {pageTitle: "프로필 수정"});
}
>>>>>>> 1e458b7a25ed3153b5ef817c98ded00b3959e9dd
