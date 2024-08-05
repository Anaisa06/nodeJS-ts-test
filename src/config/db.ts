import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Cart, Entity, Order, Permission, Product, ProductCart, Role, User } from "../models";



dotenv.config();

const sequelize: Sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [User, Product, Role, ProductCart, Permission, Order, Entity, Cart ],
    define: {
        underscored: true
    }
}
)

export default sequelize;