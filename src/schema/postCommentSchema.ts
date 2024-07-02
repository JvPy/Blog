import { Schema } from 'mongoose';
import { PostComment } from '../interfaces/PostComment';

const postCommentSchema = new Schema<PostComment>({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default postCommentSchema;
