import { traced } from "@sliit-foss/functions";
import { deletePost, retrievePostById, retrievePosts, savePost } from "../repository/post.repository";
import { errors } from "../utils";

export const addPost = async (post, user) => {
  post.user = user._id;
  return traced(savePost)(post);
};

export const getPosts = async (filter, sort, page, limit) => {
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
