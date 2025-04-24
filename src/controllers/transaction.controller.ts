import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export const getTransactions = async (_: Request, res: Response) => {
  const transactions = await Transaction.findAll({
    include: ['from_wallet', 'to_wallet']
  });
  res.json(transactions);
};

export const createTransaction = async (req: Request, res: Response) => {
  const tx = await Transaction.create(req.body);
  res.status(201).json(tx);
};
