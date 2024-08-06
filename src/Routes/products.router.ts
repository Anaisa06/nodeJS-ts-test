import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export const productsRouter: Router = Router();

productsRouter.get('/', ProductController.getAllProducts);
productsRouter.post('/', ProductController.createProduct);
productsRouter.patch('/:id', ProductController.updateProducts);
productsRouter.delete('/:id', ProductController.deleteProduct);
