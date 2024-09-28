import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const CategoyProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};

  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy,setSortBy] = useState("");

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      };
    });
  };


  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data.reverse() || []);
  }

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName;
      }
      return null;
    }).filter(ele => ele);

    setFilterCategoryList(arrayOfCategory);

    // change url on clicking on checkbox
    const urlFormat = arrayOfCategory.map((el,index) => {
      if((arrayOfCategory.length - 1 ) === index  ){
        return `category=${el}`;
      }
      return `category=${el}&&`;
    })

    navigate("/product-category?"+urlFormat.join(""));

  }, [selectCategory]);

  const handleOnChangeSortBy = (e)=>{
    const { value } = e.target;

    setSortBy(value);

    if(value === 'asc'){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice));
    }

    if(value === 'dsc'){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice));
    }
  }

  useEffect(()=>{

  },[sortBy]);


  return (
    <div className='container mx-auto p-4'>
      {/* for desktop */}
      <div className="hidden lg:grid grid-cols-[250px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-140px)]overflow-y-scroll">
          {/**sorting */}
          <div className=''>
            <h3 className='text-xl uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

            <form className='text-base flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"asc"}  checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"dsc"}  checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filters */}
          <div className='mt-3'>
            <h3 className='text-xl uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

            <form className='text-base flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>

        {/* results */}
        <div className='px-4 min-h-[calc(100vh-140px)] '>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-140px)] overflow-y-scroll max-h-[calc(100vh-140px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default CategoyProduct;


