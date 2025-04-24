import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Wallet } from "./Wallet";

@Table
export class Transaction extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  transaction_id!: number;

  @ForeignKey(() => Wallet)
  @Column
  from_wallet_id!: number;

  @ForeignKey(() => Wallet)
  @Column
  to_wallet_id!: number;

  @Column({ allowNull: false })
  currency!: string;

  @Column({ type: DataType.FLOAT })
  amount!: number;

  @Column({ allowNull: true })
  external_address!: string;

  @Column({ defaultValue: "PENDING" })
  status!: "PENDING" | "COMPLETED" | "FAILED";

  @BelongsTo(() => Wallet, "from_wallet_id")
  from_wallet!: Wallet;

  @BelongsTo(() => Wallet, "to_wallet_id")
  to_wallet!: Wallet;
}
