import { ObjectId } from "mongoose";
import { HTTP500InternalServerrror } from "../exceptions/AppError";
import { Cart, CartInterface } from "../models/Cart";

export class CartRepository {

    async findOne(where: any, populate?: Array<string>): Promise<CartInterface> {

        try {
            if (populate) {
                const [_, __] = populate;

                return await Cart.findOne({ ...where }).populate(_, __);
            }
            else {
                return await Cart.findOne({ ...where })
            }
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async find(where: any, populate?: Array<string>, populateSecond?: Array<string>, options?: any): Promise<PaginateResult<CartInterface>> {

        try {

            options??= {}

            if (populate != undefined && populateSecond != undefined) {
                const [_, __] = populate;
                const [_second, __second] = populateSecond;
                options = {
                    populate: [{
                        path: _,
                        select: __
                    },
                    {
                        path: _second,
                        select: __second
                    }],
                }
            }

            if (populate != undefined) {
                const [_, __] = populate;
                options = {
                    populate: [{
                        path: _,
                        select: __
                    },],
                }
            }
            
            return await Cart.paginate({ ...where }, options)

        }
        catch {
            throw new HTTP500InternalServerrror("Unable to query user by body");
        }
    }

    async createOne(body: any): Promise<CartInterface> {
        try {
            let cart = new Cart({ ...body });

            await cart.save();

            return cart;
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to create cart ");
        }
    }

    async updateOne(where: any, body: any): Promise<void> {
        try {
            console.log({ where, body })
            let z = await Cart.updateOne(
                { ...where },
                { ...body }
            );
            console.log({ z, where, body })
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update carts");
        }
    }

    async updateMany(where: any, body: any): Promise<void> {
        try {
            await Cart.updateMany(
                { ...where },
                { ...body }
            );
        }
        catch {
            throw new HTTP500InternalServerrror("Unable to update carts");
        }
    }

    async deleteCarts(ids: Array<string>): Promise<void> {
        try {
            console.log({ ids })

            const carts = await Cart.deleteMany({ _id: { $in: ids } });

            console.log({ ids, carts })
        }
        catch (error) {

            console.log({ error })

            throw new HTTP500InternalServerrror("Unable to update carts");
        }
    }


}


