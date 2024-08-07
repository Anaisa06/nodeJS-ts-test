import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Order } from "./order.model";

@Table({
    tableName: 'carts',
    timestamps: true
})
export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(()  => User)
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasOne(() => Order)
    order!: Order;
}