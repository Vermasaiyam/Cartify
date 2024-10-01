import React, { useContext, useEffect, useState } from 'react'
import Context from '../context';
import SummaryApi from '../common';
import rupeeSymbol from '../helpers/rupeeSymbol';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(5).fill(null);

    const fetchData = async () => {

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    }

    const handleLoading = async () => {
        await fetchData();
    }

    useEffect(() => {
        setLoading(true);
        handleLoading();
        // console.log("products", data);
        setLoading(false);
    }, [data]);


    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            fetchData()
        }
    }


    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if (responseData.success) {
                fetchData()
            }
        }
    }


    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            ),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto'>

            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data. Shop Now.</p>
                    )
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                {/* Items List */}
                <div className='w-full max-w-4xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                        <Link to={`/product/${product?.productId?._id}`} className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </Link>
                                        <div className='px-4 py-2 relative'>
                                            {/**delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)} >
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{rupeeSymbol(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{rupeeSymbol(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)} >-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                )
                            })
                        )
                    }
                </div>

                {/* Bill */}
                <div className='mt-5 lg:mt-2 w-full max-w-md'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            data.length > 0 && (
                                <div className='h-40 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 '>
                                        <p>Total Price</p>
                                        <p>{rupeeSymbol(totalPrice)}</p>
                                    </div>

                                    {
                                        totalPrice <= 599 && (
                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 '>
                                                <p>Delivery Fee</p>
                                                <p>+{rupeeSymbol(299)}</p>
                                            </div>
                                        )
                                    }

                                    <div className='flex items-center justify-between px-1 pb-1 mx-3 gap-2 font-medium text-lg text-slate-600 border-b border-slate-400'>
                                        <p>GST</p>
                                        <p>+{rupeeSymbol(totalPrice * 0.18)}</p>
                                    </div>



                                    <div className='flex items-center justify-between pt-1 px-4 gap-2 font-semibold text-xl text-slate-600'>
                                        <p>Grand Total</p>
                                        {
                                            totalPrice <= 599 ? (
                                                <p>{rupeeSymbol(totalPrice + (totalPrice * 0.18) + 299)}</p>
                                            ) : (
                                                <p>{rupeeSymbol(totalPrice + (totalPrice * 0.18))}</p>
                                            )
                                        }
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Cart
