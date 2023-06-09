import { useForm } from "react-hook-form";
import { ButtonPanel, Input, Select } from "../sharing/form"
import { useEffect, useRef } from "react";
import QueryString from "qs";

export const SearchCart = ({ setQuery }) => {
    const { handleSubmit } = useForm();
    const formRef = useRef(null)
    const onSubmit = (data, event) => {
        event.preventDefault()
        data = {
            searchBy: document.getElementById('searchBy').value,
            searchValue: document.getElementById('searchValue').value
        }
        if (data?.searchBy == "seller") {
            
            setQuery((oldQuery) => {
                const searchParamObject = QueryString.parse(oldQuery)
                if ('page' in searchParamObject) delete searchParamObject?.page;
                if ('searchBy' in searchParamObject) delete searchParamObject?.searchBy;
                searchParamObject.populate = populate
                return QueryString.stringify(searchParamObject)
            })
        }
        else {
            setQuery((oldQuery) => {
                const searchParamObject = QueryString.parse(oldQuery)
                if ('page' in searchParamObject) delete searchParamObject?.page;
                if ('populate' in searchParamObject) delete searchParamObject?.populate;
                searchParamObject.searchBy = {
                    [data?.searchBy]: data?.searchValue,
                }
                return QueryString.stringify(searchParamObject)
            })
        }
    }
    useEffect(() => {
        document.getElementById('searchBy').value = 'name'
        document.getElementById('searchValue').value = 1;
    }, [])
    return (
        <form formRef={formRef} className="flex flex-nowrap" onSubmit={handleSubmit(onSubmit)}>
            <Select
                id="searchBy"
                classNames="mr-4"
                optionNames={[
                    // "Name",
                    "Updated", "Created", "Status", "Total"]}
                optionValues={[
                    // "name",
                    "updatedAt", "createdAt", "status", "total"]}
            />
            <Input 
                id="searchValue"
                classNames="mr-4"
            />
            <ButtonPanel type="submit" classNames="mt-1">searchBy</ButtonPanel>
        </form>
    )
}