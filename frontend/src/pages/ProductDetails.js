import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";
import rupeeSymbol from '../helpers/rupeeSymbol';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")


  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });

    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);

  }
  console.log(data);


  useEffect(() => {
    fetchProductDetails()
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className=" min-h-[400px] flex flex-col lg:flex-row gap-4">
        {/* Images */}
        <div className="h-[31rem] flex flex-col lg:flex-row-reverse gap-4">

          <div className="h-[300px] w-[300px] lg:h-[31rem] lg:w-[31rem] bg-slate-200">
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' />
          </div>

          <div className="h-full">
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='h-24 w-24 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-24 w-24 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

              <div className=' bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                <p className=' bg-slate-200 w-full'></p>
                <p className='line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className=' font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
              </div>
            </div>
          ) :
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-500 font-medium'>{data?.category}</p>

                <div className='text-yellow-600 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{rupeeSymbol(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{rupeeSymbol(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-3'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>Add To Cart</button>
                </div>

                <div className=''>
                  <p className='text-slate-600 font-bold my-2'>Description : </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default ProductDetails
