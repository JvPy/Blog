import { model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Post } from '../interfaces/Post';
import postSchema from '../schema/postSchema';
import { Result } from '../interfaces/Result';

const createPostModel = () => model<Post>('Post', postSchema);

export const getById = async (id: string): Promise<Result> => {
  const PostModel = createPostModel();
  const post = await PostModel.findById(id);

  return {
    status: StatusCodes.OK,
    response: post,
  };
};

export const getAll = async (): Promise<Result> => {
  const PostModel = createPostModel();
  const posts = await PostModel.find();

  return {
    status: StatusCodes.OK,
    response: posts,
  };
};

export const create = async (title: string, text: string): Promise<Result> => {
  const PostModel = createPostModel();

  const post = await PostModel.findOne({ title });

  if (post) {
    return {
      status: StatusCodes.CONFLICT,
      message: `Post with title ${title} already exists.`,
    };
  }

  const newPost = new PostModel({
    title,
    text,
    createdAd: new Date().toISOString(),
  });

  await newPost.save();

  return {
    status: StatusCodes.NO_CONTENT,
    message: '',
  };
};

export const appendComment = async (id: string, comment: string): Promise<Result> => {
  const PostModel = createPostModel();

  try {
    await PostModel.findOneAndUpdate({ _id: id }, {
      $push: { comments: { text: comment, createdAt: new Date().toISOString() } },
    });

    return {
      status: StatusCodes.OK,
      message: `Comment '${comment}' added successfuly`,
    };
  } catch (e) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: 'Post not found',
    };
  }
};
