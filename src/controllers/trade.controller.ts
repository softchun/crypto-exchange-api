import { Request, Response } from "express";
import { Trade } from "../models/Trade";

export const getTrades = async (_: Request, res: Response) => {
  const trades = await Trade.findAll({
    include: ["order", "buyer", "seller"],
  });
  res.json(trades);
};

export const createTrade = async (req: Request, res: Response) => {
  const trade = await Trade.create(req.body);
  res.status(201).json(trade);
};
