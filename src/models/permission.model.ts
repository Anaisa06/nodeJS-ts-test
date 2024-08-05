import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { Entity } from "./entities.model";

@Table({
    tableName: 'permissions',
    timestamps: false
})
export class Permission extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER
    })
    roleId!: number;

    @ForeignKey(() => Entity)
    @Column({
        type: DataType.INTEGER
    })
    entityId!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    canCreate!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    canUpdate!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    canDelete!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    canGet!: boolean;
}