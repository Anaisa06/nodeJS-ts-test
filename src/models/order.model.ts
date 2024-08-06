import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Cart } from "./cart.model";

@Table({
    tableName: 'orders',
    timestamps: true
})
export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.FLOAT(10, 2),
        allowNull: false
    })
    total!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER
    })
    cartId!: number;

    @BelongsTo(() => Cart)
    cart!: Cart
}