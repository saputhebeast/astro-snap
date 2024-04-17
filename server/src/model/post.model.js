import mongoose from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    photo_url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes_count: {
        type: Number,
        default: 0
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        created_at: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

postSchema.plugin(mongoosePaginateV2);

const Post = mongoose.model("Post", postSchema);

export default Post;
