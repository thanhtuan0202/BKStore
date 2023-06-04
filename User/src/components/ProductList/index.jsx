import React, { useEffect, useState } from "react";
import  ProductItem  from "../ProductItem";
import axios from "axios";

import "./style.css";

export const ProductList = (props) => {
  const chosen = props.data
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProduct = async () =>{
    const res = await axios .get(
        "http://localhost:5000/list-product-into-category"
      )
      setProduct(res.data);
      setLoading(true);
  }
  useEffect(() => {
    fetchProduct();
  },  [loading])

  useEffect(() => {
    console.log("Product: ", product.data);
  }, [loading]);
  return loading === true ? (
        <div className="grid">
          {product.data[chosen].map((product,index) => (
            <ProductItem data={product} key= {index}/>
          ))}
        </div>
  )
  :( 
    <div> Hiện không có sản phẩm.</div>
  );
};
