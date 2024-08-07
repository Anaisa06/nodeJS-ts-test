import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { container } from "tsyringe";
import { Product } from "../models";
import { NotFoundError, BadRequestError } from "../interfaces/error.classes";

export class ProductController {
    static async getAllProducts( _: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productService: ProductService = container.resolve(ProductService);

      const products: Product[] = await productService.getAllProducts();

      res
        .status(200)
        .json({ message: "products fetched succesfully", data: products });
    } catch (error: any) {
      next(error);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productService: ProductService = container.resolve(ProductService);

            const { name, price, stock } = req.body;

            if(!name || !price || !stock) throw new BadRequestError('Name, price and stock are required');

            const newProduct = await productService.createProduct(req.body);

            res.status(201).json({ message: 'Product created succesfully', data: newProduct });
        } catch (error: any) {
            next(error);
        }
    }

    static async updateProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const newValues = req.body;

      const productService: ProductService = container.resolve(ProductService); 

      const productUpdated: Product | null = await productService.updateProduct(+id, newValues)

      res.status(200).json({ message: 'Product updated succesfully', data: productUpdated }) 
      
    } catch (error: any) {
      next(error)
    }
  }

    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productService: ProductService = container.resolve(ProductService);

      const { id } = req.params

      const deletedProduct: Product = await productService.deleteProduct(+id)

      res.status(200).json({ message: 'Product deleted succesfully', data: deletedProduct })
    } catch (error: any) {
      next(error);
    }
  }
}
