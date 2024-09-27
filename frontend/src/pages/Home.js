import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />

      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />

    </div>
  )
}

export default Home
