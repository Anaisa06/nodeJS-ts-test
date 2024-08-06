import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Cart } from "./cart.model";
import { Product } from "./product.model";

@Table({
    tableName: 'product_cart',
    timestamps: true
})
export class ProductCart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId!: number;

    @BelongsTo(() => Product)
    product!: Product

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cartId!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;
 
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity!: number

}