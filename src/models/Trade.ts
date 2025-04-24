import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Order } from "./Order";

@Table
export class Trade extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  trade_id!: number;

  @ForeignKey(() => Order)
  @Column
  order_id!: number;

  @ForeignKey(() => User)
  @Column
  buyer_id!: number;

  @ForeignKey(() => User)
  @Column
  seller_id!: number;

  @Column({ type: DataType.FLOAT })
  amount_crypto!: number;

  @Column({ type: DataType.FLOAT })
  amount_fiat!: number;

  @Column({ defaultValue: "PENDING" })
  status!: "PENDING" | "COMPLETED" | "FAILED";

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => User, "buyer_id")
  buyer!: User;

  @BelongsTo(() => User, "seller_id")
  seller!: User;
}
