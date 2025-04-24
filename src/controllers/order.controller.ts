import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Wallet } from "../models/Wallet";

export const getOrders = async (_: Request, res: Response) => {
  const orders = await Order.findAll({ include: ["user", "trades"] });
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const { user_id, type, currency, amount_crypto, price_fiat } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { user_id, currency } });
    if (!wallet) {
      res.status(404).json({ message: "Wallet not found" });
      return;
    }

    if (type === "SELL" && wallet.balance < amount_crypto) {
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    const order = await Order.create({
      user_id,
      type,
      currency,
      amount_crypto,
      price_fiat,
      status: "OPEN",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
