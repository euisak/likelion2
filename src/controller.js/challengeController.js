import Challenge from '../models/Challenge';
import User from '../models/User';
import ChallengeComment from '../models/ChallengeComment';
import moment from 'moment';

// 챌린지 목록 조회
export const challenge = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category && category !== '전체') {
      filter.prefix = category;
    }
    const now = new Date();
    if (status) {
      if (status === '진행중') {
        filter.endDate = { $gte: now };
      } else if (status === '완료') {
        filter.endDate = { $lt: now };
      }
    }
    const challenges = await Challenge.find(filter).sort({ startDate: 'asc' });
    console.log("Fetched Challenges:", challenges);
    return res.render('challenge', {
      pageTitle: 'Challenges',
      challenges,
      selectedCategory: category || '전체',
      selectedStatus: status || '전체'
    });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return res.render('challenge', {
      pageTitle: 'Challenges',
      challenges: [],
      selectedCategory: '전체',
      selectedStatus: '전체'
    });
  }
};

// 챌린지 상세 조회
export const watch = async (req, res) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.render("404", { pageTitle: "Challenge not found" });
    }

    // 댓글 조회
    const comments = await ChallengeComment.find({ challengeId: id }).sort({ createdAt: 'asc' });

    // 포맷팅된 날짜
    const formattedChallengeDate = challenge.toFormattedDate();
    const formattedComments = comments.map(comment => {
      return {
        ...comment.toObject(),
        formattedCreatedAt: moment(comment.createdAt).format('YYYY.MM.DD. HH:mm')
      };
    });

    return res.render("challengeWatch", {
      pageTitle: challenge.title,
      challenge,
      formattedChallengeDate,
      comments: formattedComments
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return res.render("404", { pageTitle: "Challenge not found" });
  }
};

// 챌린지 참여자 수 증가
export const participate = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user._id; // 로그인한 사용자 ID

  try {
    // 로그인 확인
    if (!req.session.user) {
      return res.redirect('/login'); // 로그인 페이지로 리디렉션
    }

    // 챌린지 조회
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }

    // 사용자 조회
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // 사용자가 이미 참여했는지 확인
    if (user.participatedChallenges.includes(id)) {
      return res.status(400).send("You have already participated in this challenge");
    }

    // 참여 기록 업데이트
    user.participatedChallenges.push(id);
    await user.save();

    // 챌린지 참여자 수 증가
    challenge.meta.participants += 1;
    await challenge.save();

    return res.status(200).json({ participantsCount: challenge.meta.participants });
  } catch (error) {
    console.error("Error increasing participants:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// 댓글 추가
// 댓글 추가
export const addComment = async (req, res) => {
  const { challengeId } = req.params;
  const { content } = req.body;

  // 로그인된 사용자의 userId 확인
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
    // 댓글 생성
    const newComment = new ChallengeComment({
      author: req.session.user.username, // 작성자 이름
      userId: loggedInUserId,           // 로그인된 사용자 ID
      content: content,
      challengeId: challengeId
    });

    // 댓글 저장
    await newComment.save();

    // 댓글이 추가된 챌린지 페이지로 리디렉션
    return res.redirect(`/challenge/${challengeId}`);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// 댓글 수정
export const editComment = async (req, res) => {
  const { challengeId, commentId } = req.params;
  const { content } = req.body;

  // 로그인된 사용자의 userId 확인
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
    const comment = await ChallengeComment.findById(commentId).exec();
    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // 댓글 작성자의 userId 확인
    if (comment.userId.toString() !== loggedInUserId.toString()) {
      return res.status(403).send("You are not allowed to edit this comment");
    }

    comment.content = content;
    await comment.save();

    return res.redirect(`/challenge/${challengeId}`);
  } catch (error) {
    console.error("Error editing comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// 댓글 삭제
export const deleteComment = async (req, res) => {
  const { challengeId, commentId } = req.params;

  // 로그인된 사용자의 userId 확인
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
    const comment = await ChallengeComment.findById(commentId).exec();
    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // 댓글 작성자의 userId 확인
    if (comment.userId.toString() !== loggedInUserId.toString()) {
      return res.status(403).send("You are not allowed to delete this comment");
    }

    await ChallengeComment.findByIdAndDelete(commentId);

    return res.redirect(`/challenge/${challengeId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};


// 챌린지 업로드 페이지 렌더링
export const getUploadChallenge = (req, res) => {
  res.render("challengeUpload", { pageTitle: "Upload Challenge" });
};

// 챌린지 업로드 처리
export const postUploadChallenge = async (req, res) => {
  const { title, prefix, description, startDate, endDate } = req.body;
  try {
    if (!req.session.loggedIn) {
      return res.redirect('/login');
    }

    const writer = req.session.user.username;
    const userId = req.session.user._id; // 로그인된 사용자의 userId

    await Challenge.create({
      prefix,
      title,
      description,
      startDate: new Date(startDate), // Date 형식으로 변환
      endDate: new Date(endDate), // Date 형식으로 변환
      writer, // 실제 작성자 username
      userId // 실제 작성자 userId
    });
    res.redirect("/challenge");
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).render("challengeUpload", {
      pageTitle: "Upload Challenge",
      errorMessage: error.message, // MongoDB 오류 메시지
    });
  }
};



// 챌린지 수정 페이지 가져오기
export const getEditChallenge = async (req, res) => {
  const { id } = req.params;

  // 로그인된 사용자의 userId 확인
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  try {
    const challenge = await Challenge.findById(id).exec();
    if (!challenge) {
      return res.render("404", { pageTitle: "Challenge not found" });
    }

    // Check if the current user is the writer of the challenge
    if (!challenge.userId || challenge.userId.toString() !== userId.toString()) {
      return res.status(403).send("You are not allowed to edit this challenge");
    }

    // Pass challenge data to the edit page
    return res.render("challengeEdit", { 
      pageTitle: "Edit Challenge", 
      challenge 
    });
  } catch (error) {
    console.error('Error fetching challenge for editing:', error);
    return res.render("404", { pageTitle: "Error", errorMessage: error.message });
  }
};





// 챌린지 수정 처리
const parseDate = (dateString) => {
  const date = moment(dateString, moment.ISO_8601, true);
  if (!date.isValid()) {
    throw new Error('Invalid date format');
  }
  return date.toDate();
};

export const challengeEdit = async (req, res) => {
  const { id } = req.params;
  const { title, prefix, description, startDate, endDate } = req.body;

  // 로그인된 사용자의 userId 확인
  const loggedInUserId = req.session.user ? req.session.user._id : null;

  if (!loggedInUserId) {
    return res.redirect('/login'); // 로그인 페이지로 리디렉션
  }

  const writer = req.session.user.username; // 로그인된 사용자의 username

  try {
    // 필수 필드 체크
    if (!title || !prefix || !description || !startDate || !endDate) {
      throw new Error("Required fields are missing");
    }

    // 날짜 파싱 및 유효성 체크
    const parsedStartDate = parseDate(startDate);
    const parsedEndDate = parseDate(endDate);

    // 챌린지 가져오기
    const challenge = await Challenge.findById(id).exec();
    if (!challenge) {
      return res.render("404", { pageTitle: "Challenge not found" });
    }

    // Check if the current user is the writer of the challenge
    if (challenge.userId.toString() !== loggedInUserId.toString()) {
      return res.status(403).send("You are not allowed to edit this challenge");
    }

    // 필드 업데이트
    challenge.title = title;
    challenge.prefix = prefix;
    challenge.description = description;
    challenge.startDate = parsedStartDate;
    challenge.endDate = parsedEndDate;
    challenge.writer = writer; // Ensure the writer field is updated correctly

    // 챌린지 저장
    await challenge.save();

    // 수정된 챌린지 페이지로 리디렉션
    return res.redirect(`/challenge/${id}`);
  } catch (error) {
    console.error('Error updating challenge:', error);
    return res.render("challengeEdit", {
      pageTitle: "Edit Challenge",
      challenge: { ...req.body, _id: id },
      errorMessage: error.message,
    });
  }
};



// 챌린지 삭제
export const deleteChallenge = async (req, res) => {
  const { id } = req.params;
  const loggedInUserId = req.session.user ? req.session.user._id : null; // 로그인된 사용자의 userId

  if (!loggedInUserId) {
    return res.redirect('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
  }

  try {
    // 챌린지 가져오기
    const challenge = await Challenge.findById(id).exec();
    if (!challenge) {
      return res.render("404", { pageTitle: "Challenge not found" });
    }

    // Check if the current user is the writer of the challenge
    if (challenge.userId.toString() !== loggedInUserId.toString()) {
      return res.status(403).send("You are not allowed to delete this challenge");
    }

    // 챌린지 삭제
    await Challenge.findByIdAndDelete(id);
    return res.redirect("/challenge");
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return res.status(500).send("Internal Server Error");
  }
};
