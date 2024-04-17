import express from "express";
import auth from "../controller/v1/auth.controller";
import user from "../controller/v1/user.controller";
import posts from "../controller/v1/post.controller";

const router = express.Router();

router.use(`/v1/auth`, auth);
router.use(`/v1/user`, user);
router.use(`/v1/post`, posts);

export default router;
