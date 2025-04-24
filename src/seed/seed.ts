import { sequelize } from "../config/database";
import { User } from "../models/User";
import { Wallet } from "../models/Wallet";
import { Order } from "../models/Order";
import { Trade } from "../models/Trade";
import { Transaction } from "../models/Transaction";

async function seed() {
  await sequelize.sync({ force: true });
  console.log("Database synced.");

  // Create Users
  const seller = await User.create({
    email: "seller1@xxx.com",
    password: "password123",
    name: "Seller1",
  });

  const buyer = await User.create({
    email: "buyer1@xxx.com",
    password: "password456",
    name: "Buyer1",
  });

  // Create Wallets
  const sellerBTC = await Wallet.create({
    user_id: seller.user_id,
    currency: "BTC",
    balance: 1.5,
  });

  const sellerTHB = await Wallet.create({
    user_id: seller.user_id,
    currency: "THB",
    balance: 1000,
  });

  const buyerBTC = await Wallet.create({
    user_id: buyer.user_id,
    currency: "BTC",
    balance: 0.0,
  });

  const buyerTHB = await Wallet.create({
    user_id: buyer.user_id,
    currency: "THB",
    balance: 500000,
  });

  // Create Order
  const order = await Order.create({
    user_id: seller.user_id,
    type: "SELL",
    currency: "BTC",
    fiat_currency: "THB",
    amount_crypto: 0.5,
    price_per_unit: 1000000,
    status: "OPEN",
  });

  // Trade
  const trade = await Trade.create({
    order_id: order.order_id,
    buyer_id: buyer.user_id,
    seller_id: seller.user_id,
    amount_crypto: 0.5,
    amount_fiat: 500000,
    status: "COMPLETED",
  });

  // Update Balances
  await buyerTHB.update({ balance: buyerTHB.balance - 500000 });
  await buyerBTC.update({ balance: buyerBTC.balance + 0.5 });

  await sellerTHB.update({ balance: sellerTHB.balance + 500000 });
  await sellerBTC.update({ balance: sellerBTC.balance - 0.5 });

  // Create Transactions
  await Transaction.bulkCreate([
    {
      from_wallet_id: buyerTHB.wallet_id,
      to_wallet_id: sellerTHB.wallet_id,
      currency: "THB",
      amount: 500000,
      type: "TRADE",
      status: "CONFIRMED",
    },
    {
      from_wallet_id: sellerBTC.wallet_id,
      to_wallet_id: buyerBTC.wallet_id,
      currency: "BTC",
      amount: 0.5,
      type: "TRADE",
      status: "CONFIRMED",
    },
  ]);

  console.log("Seed completed.");
  process.exit();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
