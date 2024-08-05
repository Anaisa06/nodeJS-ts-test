import { AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Cart } from "./cart.model";
import { ProductCart } from "./productCart.model";

@Table({
    tableName: 'products',
    timestamps: true
})
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    name!: string

    @Column({
        type: DataType.FLOAT(10, 2),
        allowNull: false
    })
    price!: number;

    @Column({
        type: DataType.TEXT
    })
    description?: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    stock!: number

    // @BelongsToMany(Cart, { through: ProductCart})
    // carts!: Cart[]
}