import Post from '../models/PostModel';
import User from '../models/User';
import PostComment from '../models/PostComment';

export const post = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: "asc" });
        return res.render("post", { pageTitle: "Post", posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.render("post", { pageTitle: "Post", posts: [] });
    }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  try {
      const post = await Post.findById(id);
      if (!post) {
          return res.render("404", { pageTitle: "Post not found" });
      }
      post.meta.views += 1;
      await post.save();

      const comments = await PostComment.find({ postId: id }).sort({ createdAt: "asc" });

      const formattedPostDate = `${new Date(post.createdAt).getFullYear()}.${String(new Date(post.createdAt).getMonth() + 1).padStart(2, '0')}.${String(new Date(post.createdAt).getDate()).padStart(2, '0')}. ${String(new Date(post.createdAt).getHours()).padStart(2, '0')}:${String(new Date(post.createdAt).getMinutes()).padStart(2, '0')}`;
      
      const formattedComments = comments.map(comment => {
          const date = new Date(comment.createdAt);
          comment.formattedCreatedAt = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
          return comment;
      });

      return res.render("watch", { pageTitle: post.title, post, formattedPostDate, comments: formattedComments });
  } catch (error) {
      console.error("Error fetching post:", error);
      return res.render("404", { pageTitle: "Post not found" });
  }
};


export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  // 로그인 확인
  if (!req.session.user) {
      return res.status(401).send("로그인이 필요합니다.");
  }

  try {
      const author = req.session.user.username; // 로그인된 사용자의 username을 author로 설정
      const userId = req.session.user._id; // 로그인된 사용자의 userId를 가져옴

      await PostComment.create({ 
          author, 
          userId,  // userId 추가
          content, 
          postId 
      });

      return res.redirect(`/post/${postId}`);
  } catch (error) {
      console.error("Error adding comment:", error);
      return res.status(500).send("Internal Server Error");
  }
};


  export const getEdit = async (req, res) => {
    const { id } = req.params;
    const loggedInUserId = req.session.user ? req.session.user._id : null;

    if (!loggedInUserId) {
        return res.redirect('/login'); // 로그인 페이지로 리디렉션
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.render("404", { pageTitle: "Post not found" });
        }

        if (post.userId.toString() !== loggedInUserId.toString()) {
            return res.status(403).send("You are not allowed to edit this post");
        }

        return res.render("edit", { pageTitle: `Edit: ${post.title}`, post });
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).send("Internal Server Error");
    }
};


export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, prefix, content } = req.body;
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
      return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
      const post = await Post.findById(id).exec();
      if (!post) {
          return res.render("404", { pageTitle: "Post not found" });
      }

      if (post.userId.toString() !== loggedInUserId.toString()) {
          return res.status(403).send("You are not allowed to edit this post");
      }

      post.title = title;
      post.prefix = prefix;
      post.content = content; // Quill 에디터에서 전달된 HTML 콘텐츠
      await post.save();
      return res.redirect(`/post/${id}`);
  } catch (error) {
      return res.render("edit", {
          pageTitle: "Edit Post",
          post: { ...req.body, _id: id },
          errorMessage: error.message, // MongoDB 오류 메시지
      });
  }
};



export const getUpload = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }
  return res.render("upload", { pageTitle: "Upload Post" });
};


export const postUpload = async (req, res) => {
  const { title, prefix, content } = req.body;
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
      return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
      const writer = req.session.user.username; // 로그인된 사용자의 username을 writer로 설정
      await Post.create({
          prefix,
          title,
          writer, // 실제 작성자 username
          userId: loggedInUserId, // 실제 작성자 userId로 설정
          content // Quill 에디터에서 전달된 HTML 콘텐츠
      });
      return res.redirect("/post");
  } catch (error) {
      return res.render("upload", {
          pageTitle: "Upload Post",
          errorMessage: error.message // MongoDB 오류 메시지
      });
  }
};


export const deletePost = async (req, res) => {
  const { id } = req.params;
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
      return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
      const post = await Post.findById(id);
      if (!post) {
          return res.render("404", { pageTitle: "Post not found" });
      }

      if (post.userId.toString() !== loggedInUserId.toString()) {
          return res.status(403).send("You are not allowed to delete this post");
      }

      await Post.findByIdAndDelete(id);
      return res.redirect("/post");
  } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).send("Internal Server Error");
  }
};


export const search = async (req, res) => {
  const { keyword } = req.query;
  let posts = [];
  if (keyword) {
      posts = await Post.find({
          title: {
              $regex: new RegExp(keyword, "i")
          }
      });
  }
  return res.render("search", { pageTitle: "Search", posts });
};

export const increaseLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user._id; // 로그인한 사용자 ID

  try {
    if (!req.session.loggedIn) {
      // 로그인되지 않은 상태일 경우 JSON 응답 반환
      return res.status(401).json({ message: '로그인 필요' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // 사용자가 이미 좋아요를 누른 게시물인지 확인
    const user = await User.findById(userId);
    if (user.likedPosts.includes(id)) {
      return res.status(400).json({ message: '이미 좋아요를 누른 게시물입니다.' });
    }

    // 좋아요 업데이트
    post.meta.like += 1;
    await post.save();

    // 사용자 좋아요 기록 업데이트
    user.likedPosts.push(id);
    await user.save();

    return res.status(200).json({ likeCount: post.meta.like });
  } catch (error) {
    console.error("Error increasing like:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// 댓글 수정 함수
export const editComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  
  // 로그인 확인
  if (!req.session.user) {
    return res.redirect('/login');

  }

  try {
    const comment = await PostComment.findById(commentId);
    if (!comment || comment.postId.toString() !== postId) {
      return res.status(404).send("Comment not found");
    }

    // 댓글 작성자 확인
    if (comment.userId.toString() !== req.session.user._id.toString()) {
      return res.status(403).send("You are not allowed to edit this comment");
    }

    comment.content = content;
    await comment.save();
    return res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error("Error editing comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// 댓글 삭제 함수
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  
  // 로그인 확인
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const comment = await PostComment.findById(commentId);
    if (!comment || comment.postId.toString() !== postId) {
      return res.status(404).send("Comment not found");
    }

    // 댓글 작성자 확인
    if (comment.userId.toString() !== req.session.user._id.toString()) {
      return res.status(403).send("You are not allowed to delete this comment");
    }

    await PostComment.findByIdAndDelete(commentId);
    return res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};
