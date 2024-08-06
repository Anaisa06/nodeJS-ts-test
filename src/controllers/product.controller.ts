import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { container } from "tsyringe";
import { Product } from "../models";
import { CustomError } from "../helpers/error.helper";

export class ProductController {
    static async getAllProducts( _: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productService: ProductService = container.resolve(ProductService);
      const products: Product[] = await productService.getAllProducts();

      if (!products.length) throw new CustomError(404, "No products were found");

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

            if(!name || !price || !stock) throw new CustomError(400, 'Name, price and stock are required');

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

      const product = await productService.getProductById(+id)
      if(!product) throw new CustomError (404, 'Product not found');   

      await productService.updateProduct(+id, newValues)

      const productUpdated = await productService.getProductById(+id)

      res.status(200).json({ message: 'Product updated succesfully', data: productUpdated }) 
      
    } catch (error: any) {
      next(error)
    }
  }

    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productService: ProductService = container.resolve(ProductService);

      const { id } = req.params

      const product = await productService.getProductById(+id)
      if(!product) throw new CustomError (404, 'product not found');

      await productService.deleteProduct(+id)

      res.status(200).json({ message: 'Product deleted succesfully', data: product })
    } catch (error: any) {
      next(error);
    }
  }


}
