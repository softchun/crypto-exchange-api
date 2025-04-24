import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Trade } from "./Trade";

@Table
export class Order extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  order_id!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @Column({ allowNull: false })
  type!: "BUY" | "SELL";

  @Column({ allowNull: false })
  currency!: string; // BTC, ETH, XRP, DOGE

  @Column({ allowNull: false })
  fiat_currency!: string; // THB, USD

  @Column({ type: DataType.FLOAT })
  amount_crypto!: number;

  @Column({ type: DataType.FLOAT })
  price_per_unit!: number;

  @Column({ defaultValue: "OPEN" })
  status!: "OPEN" | "COMPLETED" | "CANCELLED";

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Trade)
  trades!: Trade[];
}
