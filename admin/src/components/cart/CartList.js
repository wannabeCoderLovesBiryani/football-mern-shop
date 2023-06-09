import { useState } from "react"
import { Table } from "../sharing/table/Table";
import { convertMongoToHumanDate } from "@/utils/convertMongoToHumanDate";
import { roundOff } from "@/utils/roundOff";
import { toastError, toastSuccess } from "@/utils/toast";
import { Loading } from "../layout/Loading";

export const CartList = ({
    cartList, setCurrentIndex, deletCart, loading
}) => {
    const [loadingIndex, setLoadingIndex] = useState(-1)
    const onDelete = async (index, id) => {
        setLoadingIndex(index);
        try {
            await fetchClient.post(`/product/delete`, {
                ids: [id]
            })
            setTimeout(() => {
                setLoadingIndex(-1);
                toastSuccess("Deleted user successfully")
                deletCart(id);
            }, 3000)
        }
        catch (error) {
            setLoadingIndex(-1);
            toastError(error);
        }
    }
    return (
        <div>
            {loading && (<div classNames="min-h-screen mx-auto" ><Loading classNames="text-green-400 mx-auto w-[50px] h-[256px]" /></div>)}
            {
                !loading &&
                <Table
                    tableHeading={["Customer name", "Updated", "Created", "Status", "Total", ""]}
                    render={
                        () => (
                            <>
                                {cartList?.map((value, index) => (
                                    <tr key={value?._id}>
                                        <th>{index + 1}</th>
                                        <td className="max-w-[300px] truncate pr-6">{value?.user?.name}</td>
                                        <td>{convertMongoToHumanDate(value?.updatedAt)}</td>
                                        <td>{convertMongoToHumanDate(value?.createdAt)}</td>
                                        <td>{value?.status} </td>
                                        <td>{value?.total > 0 ? "£ " + roundOff(value?.total) : "-"}</td>
                                        <td>
                                            <div className={`${loadingIndex === index ? "opacity-40 pointer-events-none" : ""}`}>
                                                <>
                                                    <label
                                                        htmlFor="my-modal"
                                                        onClick={() => { setCurrentIndex(index); }}
                                                        className=""
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                            className="w-6 h-6 inline text-green-500 cursor-pointer hover:text-blue-500"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </label>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                        className="ml-3 w-6 h-6 inline cursor-pointer text-red-500 hover:text-blue-500"
                                                        onClick={() => { onDelete(indeex, value?._id); }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )
                    }
                />
            }
        </div>
    );
};
