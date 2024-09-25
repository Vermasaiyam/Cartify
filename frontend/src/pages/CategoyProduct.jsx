import React from 'react'
import { useParams } from 'react-router-dom'

const CategoyProduct = () => {
    const params = useParams();
  return (
    <div>
      {params.categoryName}
    </div>
  )
}

export default CategoyProduct
