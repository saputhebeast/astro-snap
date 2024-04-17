import mongoose from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

likeSchema.plugin(mongoosePaginateV2);

const Like = mongoose.model("Like", likeSchema);

export default Like;
