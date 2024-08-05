import User from "../models/User";
import Post from '../models/PostModel';
import bcrypt from "bcrypt";

//[홈]
export const home = async(req,res)=> {
    try {
        // 상위 5개의 게시글을 조회합니다.
        const top5Posts = await Post.find({})
          .sort({ 'meta.like': -1 }) // 좋아요 수를 기준으로 내림차순 정렬
          .limit(5)
          .exec();
    
        // 홈 페이지를 렌더링합니다.
        return res.render("home", {
          pageTitle: "헬스인",
          top5Contents: top5Posts
        });
      } catch (error) {
        console.error("Error fetching top 5 posts:", error);
        return res.render("home", {
          pageTitle: "헬스인",
          top5Contents: []
        });
      }
};

//[회원가입]
export const getJoin = (req,res)=> {
    return res.render("join", {pageTitle: "회원가입"});
}

export const postJoin = async(req,res)=> {
    const {userId, userPw, userPwCheck, username, email, userType} = req.body;
    const userIdExists = await User.exists({userId: userId});
    const emailExists = await User.exists({email: email});
    if (userPw !== userPwCheck) {
        return res.render("join", { pwErrorMessage: '비밀번호가 일치하지 않습니다.' });
    }
    if(userIdExists, emailExists){
        return res.status(400).render("join", {
            pageTitle: "회원가입",
            userErrorMessage: "이미 사용중인 아이디입니다.",
            emailErrorMessage: "이미 사용중인 이메일입니다.",
        });
    }
    if(userIdExists){
        return res.status(400).render("join", {
            pageTitle: "회원가입",
            userErrorMessage: "이미 사용중인 아이디입니다.",
        });
    }
    if(emailExists){
        return res.status(400).render("join", {
            pageTitle: "회원가입",
            emailErrorMessage: "이미 사용중인 이메일입니다.",
        });
    }
    try{
        User.create({
        userId: userId,
        userPw: userPw,
        username: username,
        email: email,
        userType: userType,
        })
        return res.redirect("/login");
    } catch {
        return res.status(404).render("404", {pageTitle: "404"});
    }
}

//[로그인]
export const getLogin = (req,res)=> {
    return res.render("login", {pageTitle: "로그인"});
}

export const postLogin = async(req,res)=> {
    const {userId, userPw} = req.body;
    const user = await User.findOne({userId: userId});
    if(!user){
        return res.status(400).render("login", {
            pageTitle: "로그인",
            userIdErrorMessage: "존재하지 않는 아이디입니다.",
        });
    }
    const loginAccess = await bcrypt.compare(userPw, user.userPw);
    if(!loginAccess){
        return res.status(400).render("login", {
            pageTitle: "로그인",
            userPwErrorMessage: "존재하지 않는 비밀번호입니다.",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log(req.session.user);
    return res.redirect("/");
}

//[자주묻는 질문]
export const faq = (req,res)=> {
    return res.render("faq", {pageTitle: "자주묻는 질문"})
};