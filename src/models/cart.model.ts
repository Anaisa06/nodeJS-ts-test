import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { User } from "./user.model";

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
    user!: User
}