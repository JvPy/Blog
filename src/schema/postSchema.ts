import { Schema } from 'mongoose';
import { Post } from '../interfaces/Post';
import postCommentSchema from './postCommentSchema';

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAd: { type: Date, required: true },
  comments: { type: [postCommentSchema], required: false },
});

export default postSchema;
