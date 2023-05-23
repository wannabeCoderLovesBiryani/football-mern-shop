import { useMemo, useState } from 'react';
import { fetchSSR } from '../../api/fetchSSR';
import Layout from '@/components/layout/Layout';
import { ProductList } from '@/components/ProductList';
import { Heading1 } from '@/components/sharing/typography/Heading1';
import { Pagination } from '@/components/Pagination';

export default function ProductPage({ _productList }) {
    
    return useMemo(() => (
        <Layout>
            <main
                className={`min-h-screen font-primary w-11/12 lg:w-7/12 mx-auto`}
            >
                <Heading1 classNames="mt-12">Products</Heading1>
                <Pagination/>
                <ProductList productList={_productList}/>
            </main>
        </Layout>
    ))
}

export async function getServerSideProps({req, res}) {
    try{        
        const productList = await fetchSSR({req, res}).get("product")
        return {
            props: {
                _productList: productList.product,
            },
    
        }
    }
    catch(error){
        console.log({error})
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        }
    }
}
