import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../repositores";
import { Product } from "../models";

@injectable()
export class ProductService {
    constructor(@inject(ProductRepository) private productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAll();
    }

    async getProductById(id: number) : Promise<Product|null> {
        return await this.productRepository.getById(id);
    }

    async createProduct(product: Partial<Product>): Promise<Product> {
        return await this.productRepository.create(product);
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<number> {
        const [ affectedCounts ] = await this.productRepository.update(id, product);
        return affectedCounts;
    }

    async deleteProduct(id: number): Promise<number> {
        return await this.productRepository.delete(id);
    }
    
}