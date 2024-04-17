import express from "express";
import { celebrate, Segments } from "celebrate";
import { traced, tracedAsyncHandler } from "@sliit-foss/functions";
import { default as filterQuery } from "@sliit-foss/mongoose-filter-query";
import { response } from "../../utils";
import { addPostSchema } from "../../schema/post.schema";
import context from "express-http-context";
import { addPost, getPost, getPosts, removePost } from "../../service/post.service";

const posts = express.Router();

posts.post(
  "/",
  celebrate({ [Segments.BODY]: addPostSchema }),
  tracedAsyncHandler(async function addPostController(req, res) {
    const post = await traced(addPost)(req.body, context.get("user"));
    return response({ res, message: "Post added successfully", data: post });
  })
);

posts.get(
  "/",
  filterQuery,
  tracedAsyncHandler(async (req, res) => {
    const posts = await traced(getPosts)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return response({ res, message: "Posts retrieved successfully", data: posts });
  })
);

posts.get(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const post = await traced(getPost)(req.params.id);
    return response({ res, message: "Post retrieved successfully", data: post });
  })
);

posts.delete(
  "/:id",
  tracedAsyncHandler(async (req, res) => {
    const post = await traced(removePost)(req.params.id);
    return response({ res, message: "Post deleted successfully", data: post });
  })
);

export default posts;
