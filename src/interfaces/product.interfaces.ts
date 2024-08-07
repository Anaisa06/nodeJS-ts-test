export interface ICreateProduct{
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface IUpdateProduct extends Partial<ICreateProduct>{}