import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';
import { Order } from '../models/Order';
import { Trade } from '../models/Trade';
import { Transaction } from '../models/Transaction';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.db',
  models: [User, Wallet, Order, Trade, Transaction],
  logging: false,
});
