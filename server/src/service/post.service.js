import { traced } from "@sliit-foss/functions";
import { deletePost, retrievePostById, retrievePosts, savePost, updatePost } from "../repository/post.repository";
import { errors } from "../utils";

export const addPost = (post, user) => {
  post.user = user._id;
  return traced(savePost)(post);
};

export const addRemoveLike = async (id, user) => {
  const post = await traced(retrievePostById)(id);
  if (!post) {
    throw errors.post_not_found;
  }
    const liked = post.likes.find((like) => like._id.toString() === user._id.toString());
    if (liked) {
      post.likes = post.likes.filter((like) => like._id.toString() !== user._id.toString());
      post.likes_count = post.likes.length;
    } else {
      post.likes.push(user);
      post.likes_count = post.likes.length;
    }
  return traced(updatePost)(id, post);
};

export const getPosts = (filter, sort, page, limit) => {
  return traced(retrievePosts)(filter, sort, page, limit);
};

export const getPost = async (id) => {
  const post = await traced(retrievePostById)(id);
  if (!post) {
    throw errors.post_not_found;
  }
  return post;
};

export const removePost = async (id) => {
  const post = await traced(retrievePostById)(id);
  if (!post) {
    throw errors.post_not_found;
  }
  return traced(deletePost)(id);
};
