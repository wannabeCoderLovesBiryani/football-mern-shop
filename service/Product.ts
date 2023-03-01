import { ObjectId } from "mongoose";
import { HTTP401UnauthorizedError } from "../exceptions/AppError";
import { ProductInterface } from "../models/Product";
import { ProductRepository } from "../repository/Product";

// All Business logic will be here

export class ProductService {
    repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async getProductById(userId: ObjectId): Promise<ProductInterface> {
        try {
            return await this.repository.findById(userId);
        } catch (err) {
            throw err;
        }
    }

    async getAllProducts(): Promise<Array<ProductInterface>> {
        try {
            return await this.repository.find();
        } catch (err) {
            throw err;
        }
    }

    async findOneProduct(body: any, select?: any): Promise<ProductInterface> {
        try {
            return select ? await this.repository.findOne(body, select) : await this.repository.findOne(body) ;
        } catch (err) {
            throw err;
        }
    }

}

