import multer from "multer";

//[locals 모음집 미들웨어]
export const localsMiddleware = (req, res, next) => {
    //로그인을 성공했다면 loggedIn변수에 true저장
    if(req.session.loggedIn){
        res.locals.loggedIn = true;
        res.locals.loggedInUser = req.session.user;
    }
    next();
};

//[multer 미들웨어]
export const storemulterMiddleware = multer({
    dest: "uploads/store/",
});

