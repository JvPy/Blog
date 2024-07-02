import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  appendComment, create, getAll, getById,
} from '../services/post.service';

const getPosts = async (_: Request, res: Response) => {
  const result = await getAll();

  return res.status(result.status).json(result.response);
};

const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json('Id is required');
  }

  const result = await getById(id);

  return res.status(result.status).json(result.response);
};

const addPost = async (req: Request, res: Response) => {
  const { title, text } = req.body;

  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json('Title is required');
  }

  if (!text) {
    return res.status(StatusCodes.BAD_REQUEST).json('Text is required');
  }

  const result = await create(title, text);

  return res.status(result.status).json(result.message);
};

const addComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json('Id is required');
  }

  if (!text) {
    return res.status(StatusCodes.BAD_REQUEST).json('Comment body is required');
  }

  const result = await appendComment(id, text);

  return res.status(result.status).json(result.message);
};

export {
  getPost,
  getPosts,
  addComment,
  addPost,
};
