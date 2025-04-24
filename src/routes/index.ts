import express from "express";
import * as UserController from "../controllers/user.controller";
import * as WalletController from "../controllers/wallet.controller";
import * as OrderController from "../controllers/order.controller";
import * as TradeController from "../controllers/trade.controller";
import * as TransactionController from "../controllers/transaction.controller";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);

router.get("/wallets", WalletController.getWallets);
router.post("/wallets", WalletController.createWallet);

router.get("/orders", OrderController.getOrders);
router.post("/orders", OrderController.createOrder);

router.get("/trades", TradeController.getTrades);
router.post("/trades", TradeController.createTrade);

router.get("/transactions", TransactionController.getTransactions);
router.post("/transactions", TransactionController.createTransaction);

export default router;
