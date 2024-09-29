import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";
import rupeeSymbol from '../helpers/rupeeSymbol';
import CategroyWiseProductDisplay from '../components/CategroyWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
// import ReactStars from "react-rating-stars-component";
// import { useSelector, useDispatch } from "react-redux";
// import {
  // fetchProductDetails,
  // newReviewRequest,
// } from "../Redux/Product/productReducer";

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

  // const [comment, setcomment] = useState("");
  // const [rating, setrating] = useState(0);
  // const dispatch = useDispatch();
  // const { id } = useParams();

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const { fetchUserAddToCart } = useContext(Context);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);


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

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log("coordinate", left, top, width, height);

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, [zoomImageCoordinate]);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  }

  // const handleReviewSumbit = (e) => {
  //   e.preventDefault();
  //   const myForm = new FormData();
  //   myForm.set("rating", rating);
  //   myForm.set("comment", comment);
  //   myForm.set("productId", id);
  //   console.log(myForm);
  //   dispatch(newReviewRequest(myForm));
  //   setTimeout(() => {
  //     dispatch(fetchProductDetails(id));
  //   }, 1000);

  // };

  return (
    <div className='container mx-auto p-4'>
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Images */}
        <div className="h-[31rem] flex flex-col lg:flex-row-reverse gap-4">

          <div className="h-[300px] w-[300px] lg:h-[31rem] lg:w-[31rem] bg-slate-200 relative p-2">
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/* zoom image */}
            {

              zoomImage && (
                <div className="hidden lg:block absolute min-w-[550px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[570px] top-0">
                  <div
                    className='w-full h-full min-h-[450px] min-w-[550px] mix-blend-multiply scale-150'
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                    }}
                  >

                  </div>
                </div>
              )
            }
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
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy Now</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                </div>

                <div className=''>
                  <p className='text-slate-600 font-bold my-2'>Description : </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            )
        }
      </div>

      {/* <div className="max-w-7xl p-0 mx-auto">
        <h2 className="text-[#003D29] font-poppins">Reviews</h2>
        <div className="flex flex-col md:flex-row">
          {productDetails &&
            productDetails.reviews &&
            productDetails.reviews.map((review) => {
              return <ReviewsCard key={review.user} {...review} />;
            })}
        </div>
      </div>

      <div className="max-w-7xl bg-white rounded-lg mx-auto">
        <div className="text-[#0B0E3F]">
          <div className="my-5 space-y-5 flex flex-col items-center">
            <div className="w-full">
              <label className="font-semibold mb-0.5">Your Review Matters !!!</label>
              <ReactStars
                count={5}
                edit={true}
                size={24}
                isHalf={true}
                activeColor="#ffd700"
                value={rating}
                onChange={(e) => {
                  setrating(e);
                }}
              />
              <textarea
                className="border border-gray-300 resize-none w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                rows="8"
                placeholder="Type your review ..."
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="rounded-none px-8 py-3 bg-gray-900 text-white uppercase hover:translate-y-1 hover:shadow-lg transform transition-transform"
                onClick={handleReviewSumbit}
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div> */}


      {
        data.category && (
          <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Products"} />

        )
      }

    </div>
  )
};


// const ReviewsCard = ({ name, rating, comment }) => {
//   return (
//     <div className="flex justify-center py-6 font-poppins">
//       <div className="max-w-[450px] w-full bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 text-center">
//         <div className="relative mb-4">
//           <img
//             className="w-24 h-24 rounded-full mx-auto"
//             src={AvtarImg}
//             alt="Avatar"
//           />
//           <div className="absolute w-4 h-4 bg-green-300 border-2 border-white rounded-full bottom-0 right-3"></div>
//         </div>
//         <h2 className="text-2xl font-poppins">{name}</h2>
//         <div className="flex justify-center items-center">
//           <span className="font-bold">Rating :</span>
//           <ReactStars
//             count={5}
//             edit={false}
//             size={24}
//             isHalf={true}
//             activeColor="#ffd700"
//             value={rating}
//           />
//         </div>
//         <p className="text-gray-700 dark:text-gray-400 p-3">{comment}</p>
//       </div>
//     </div>
//   );
// };


export default ProductDetails
