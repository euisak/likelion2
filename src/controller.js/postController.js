import Post from "../models/post";
import User from "../models/User";

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
        const post = await Post.findById(id).populate("writer");
        if (!post) {
            return res.render("404", { pageTitle: "Post not found" });
        }
        post.meta.views += 1;
        await post.save();

        // 포맷된 날짜를 추가
        post.comments = post.comments.map(comment => {
            const date = new Date(comment.createdAt);
            comment.formattedCreatedAt = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return comment;
        });

        const formattedPostDate = `${new Date(post.createdAt).getFullYear()}.${String(new Date(post.createdAt).getMonth() + 1).padStart(2, '0')}.${String(new Date(post.createdAt).getDate()).padStart(2, '0')}. ${String(new Date(post.createdAt).getHours()).padStart(2, '0')}:${String(new Date(post.createdAt).getMinutes()).padStart(2, '0')}`;

        return res.render("watch", { pageTitle: post.title, post, formattedPostDate });
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.render("404", { pageTitle: "Post not found" });
    }
};



export const addComment = async (req, res) => {
    const { postId } = req.params;
    const { author, content } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // 댓글 추가
        post.comments.push({ author, content });
        await post.save();

        return res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).send("Internal Server Error");
    }
};


export const getEdit = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post){
        return res.render("404", {pageTitle: "Post not found"});
    }
    return res.render("edit", { pageTitle: `Edit: ${post.title}`, post});
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, prefix, content } = req.body;

    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            return res.render("404", { pageTitle: "Post not found" });
        }

        post.title = title;
        post.prefix = prefix;
        post.content = content;  // Quill 에디터에서 전달된 HTML 콘텐츠

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
    return res.render("upload", {pageTitle: "Upload Post"});
    
};

export const postUpload = async (req, res) => {
    const { title, prefix, content } = req.body;
    const id = req.session.user._id;

    try {
        await Post.create({
            prefix: prefix,
            title: title,
            writer: id,  // 실제 작성자 ID로 대체
            content: content,   // Quill 에디터에서 전달된 HTML 콘텐츠
        });
        return res.redirect("/post");
    } catch (error) {
        return res.render("upload", {
            pageTitle: "Upload Post",
            errorMessage: error.message, // MongoDB 오류 메시지
        });
    }
};


export const deletePost = async(req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.redirect("/post");
};


export const search = async (req, res) => {
    const { keyword } = req.query;
    let posts = [];
    if (keyword) {
        // $regex 연산자에 변수를 올바르게 전달
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
    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.meta.like += 1;
    await post.save();

    return res.status(200).json({ likeCount: post.meta.like });
};

// 댓글 수정
export const editComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        comment.content = content;
        await post.save();

        return res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error("Error editing comment:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// 댓글 삭제
export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        post.comments.id(commentId).remove();
        await post.save();

        return res.redirect(`/post/${postId}`);
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).send("Internal Server Error");
    }
};
