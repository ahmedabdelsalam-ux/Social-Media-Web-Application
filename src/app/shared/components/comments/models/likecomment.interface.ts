export interface LikeCommentRespons {
  success: boolean;
  message: string;
  data: Likecomment;
}

export interface Likecomment {
  liked: boolean;
  likesCount: number;
  comment: Comment;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: any;
  likes: any[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
