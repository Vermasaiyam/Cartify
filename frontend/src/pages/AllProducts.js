import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {

    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url);
        const dataResponse = await response.json();

        console.log("product data", dataResponse);

        setAllProduct(dataResponse?.data || []);
    }

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const groupedProducts = allProduct.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className='font-bold text-lg'>All Products</h2>
                <button
                    className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full '
                    onClick={() => setOpenUploadProduct(true)}
                >
                    Upload Product
                </button>
            </div>
            <div className='px-3 mt-4'>
                <p className='font-medium text-slate-800 text-base'><span className='font-semibold text-lg'>Total Products : </span>{allProduct.length}</p>
            </div>

            {/* <div className='flex items-center flex-wrap gap-7 py-4 h-[calc(100vh-220px)] overflow-y-scroll'>

                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />

                        )
                    })
                }
            </div> */}

            <div className='m-2 py-4 h-[calc(100vh-220px)] overflow-y-scroll'>
                {
                    // Loop through each category and display its products
                    Object.keys(groupedProducts).map((category, idx) => (
                        <div key={idx}>
                            {/* Category Heading */}
                            <h2 className="text-2xl font-bold mb-4 mx-2 mt-4 capitalize">{`${category} (${groupedProducts[category].length})`}</h2>

                            {/* Products under each category */}
                            <div className='flex items-center flex-wrap gap-7'>
                                {
                                    groupedProducts[category].map((product, index) => (
                                        <AdminProductCard data={product} key={index + "product"} fetchdata={fetchAllProduct} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>


            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
        </div>
    )
}
    ;
export default AllProducts
