import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.findAll({ include: ['wallets'] });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};
