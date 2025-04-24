import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Wallet } from "./Wallet";
import { Order } from "./Order";
import { Trade } from "./Trade";

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  user_id!: number;

  @Column({ allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column({ allowNull: false })
  name!: string;

  @HasMany(() => Wallet)
  wallets!: Wallet[];

  @HasMany(() => Order)
  orders!: Order[];

  @HasMany(() => Trade, { foreignKey: "buyer_id" })
  trades_as_buyer!: Trade[];

  @HasMany(() => Trade, { foreignKey: "seller_id" })
  trades_as_seller!: Trade[];
}
