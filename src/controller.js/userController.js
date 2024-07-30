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