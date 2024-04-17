import Post from "../model/post.model";

const populate = [
    { path: "user", select: "_id name email" }
];

export const savePost = (post) => {
  return Post.create(post);
};

export const retrievePostById = (id) => {
  return Post.findById(id).populate(populate).lean();
};

export const retrievePosts = (filters = {}, sorts = {}, page, limit) => {
  if (page && limit) {
    return Post.paginate(filters, { populate: populate, sort: sorts, page, limit, lean: true });
  }
  return Post.find(filters).sort(sorts).populate(populate).lean();
};

export const deletePost = (id) => {
  return Post.findByIdAndDelete(id);
};

export const updatePost = (id, post) => {
    return Post.findByIdAndUpdate(id, post, { new: true }).populate(populate).lean();
}
