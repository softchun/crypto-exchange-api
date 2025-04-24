import { Request, Response } from 'express';
import { Wallet } from '../models/Wallet';

export const getWallets = async (_: Request, res: Response) => {
  const wallets = await Wallet.findAll({ include: ['user'] });
  res.json(wallets);
};

export const createWallet = async (req: Request, res: Response) => {
  const wallet = await Wallet.create(req.body);
  res.status(201).json(wallet);
};
