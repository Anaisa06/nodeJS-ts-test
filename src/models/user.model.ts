import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Role } from "./role.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  password!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Cart)
  carts!: Cart[];

  @HasMany(() => Order)
  orders!: Order;
}
