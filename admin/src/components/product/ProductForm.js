import fetchClient from "../../../api/fetchClient";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const ProductForm = ({
    currentProduct, setCurrentIndex, addToProduct, editProduct
}) => {
    const isAddMode = currentProduct === null;
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        if (isAddMode) {
            try {
                const response = await fetchClient.post('/product', data)
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    addToProduct({ ...response.data });
                }, 3000);
            }
            catch (error) {
                if (loading) setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
        else {
            try {
                const response = await fetchClient.put(`/product/${currentProduct._id}`, {
                    ...data,
                })
                await setTimeout(() => {
                    setLoading(false);
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    editProduct({ ...currentProduct, ...data });
                }, 3000);
            } catch (error) {
                setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            }
        }
    }
    const formRef = useRef(null)

    return (
        <div>
            <h1 className='pb-5 text-xl font-bold'>
                {isAddMode ? <> Add Products... </> : <> Edit Products... </>}
            </h1>

            <form
                formRef={formRef}
                className="font-medium"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mx-auto">
                    {/* Product name */}
                    <label className="label">
                        <span className="label-text">Product name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentProduct?.name}
                        {...register("name")}
                        required
                        placeholder="Enter product name..."
                        className="input input-bordered dark:bg-white inline w-full  mb-2"
                    />
                    {/* Seller name */}
                    <label className="label">
                        <span className="label-text">Seller name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentProduct?.seller?.name}
                        {...register("seller.name")}
                        required
                        placeholder="Enter seller name..."
                        className="input input-bordered dark:bg-white inline w-full  mb-2"
                    />
                    <div className="grid lg:grid-cols-2">
                        <div>
                            {/* Type */}
                            <label className="label">
                                <span className="label-text">Type</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentProduct?.type}
                                {...register("manufacturer")}
                                required
                                placeholder="Enter product type..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <label className="label">
                                <span className="label-text">Manufacturer</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentProduct?.manufacturer}
                                {...register("manufacturer")}
                                required
                                placeholder="Enter product manufacturer..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Price */}
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentProduct?.price}
                                {...register("price")}
                                required
                                placeholder="Enter price..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>
                        <div>
                            {/* Manufacturer */}
                            <label className="label">
                                <span className="label-text">Stock</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={currentProduct?.stock}
                                {...register("stock")}
                                required
                                placeholder="Enter stock..."
                                className="input input-bordered dark:bg-white inline w-full  mb-2"
                            />
                        </div>

                    </div>

                    <div className="flex justify-center">
                        {
                            isAddMode ?
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit" >
                                        Add Product
                                    </button>
                                </>
                                :
                                <>
                                    <button className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`} type="submit">
                                        Edit Product
                                    </button>
                                    <button className={`btn btn-primary mt-4 ml-5 ${loading ? "loading" : ""}`}
                                        onClick={() => { reset(); setCurrentIndex(-1); }}>
                                        Add mode
                                    </button>
                                </>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}