import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../repositores";
import { Product } from "../models";
import { ICreateProduct, IUpdateProduct } from "../interfaces/product.interfaces";
import { NotFoundError } from "../interfaces/error.classes";

@injectable()
export class ProductService {
    constructor(@inject(ProductRepository) private productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        const products: Product[] = await this.productRepository.getAll();

        if (!products.length) throw new NotFoundError("No products were found");

        return products;
    }

    async getProductById(id: number) : Promise<Product> {
        const product: Product | null = await this.productRepository.getById(id);

        if(!product) throw new NotFoundError(`Product with id ${id} not found`);

        return product;
    }

    async createProduct(product: ICreateProduct): Promise<Product> {
        return await this.productRepository.create(product);
    }

    async updateProduct(id: number, product: IUpdateProduct): Promise<Product> {
        const [affectedCount] = await this.productRepository.update(id, product);

        if (!affectedCount) throw new NotFoundError(`Product with id ${id} not found`);

        const updatedProduct: Product = await this.getProductById(id);
        
        return updatedProduct;
    }

    async deleteProduct(id: number): Promise<Product> {
        const product: Product | null = await this.getProductById(id);

        if (!product) throw new NotFoundError(`Product with id ${id} not found`);

        await this.productRepository.delete(id);

        return product;
    }
    
}