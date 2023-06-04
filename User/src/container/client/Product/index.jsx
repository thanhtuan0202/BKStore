import React,{useEffect,useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./pro_style.css";
import { ProductList } from "../../../components/ProductList";

const Product = () => {
      
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chosen, setChosen] = useState(0);

  const fetchCategory = async (props) =>{
    const res = await axios .get(
      "http://localhost:5000/read-list-category"
    )
      setCategory(res.data);
      setLoading(true);
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log("ListCategory: ", category.data);
  }, [loading]);

  return loading === true ? (
    <>
    <div className="grid-container"> 
        <div className="sidebar grid-item">
            <span className="sidebar__h">
                <i class="bi bi-menu-down"></i>
                <h3 > DANH MỤC SẢN PHẨM </h3>
            </span>
            {category.data.map((item, index) => (
                <Button
                    fullWidth
                    style={{
                        textTransform: "none",
                        color: index === chosen ? "white" : "black",
                        display: "flex",
                        justifyContent: "flex-start",
                        borderBottom: index === chosen ? "" : "solid 1px #B5D2E8",
                    }}
                    size="large"
                    onClick={() => {setChosen(index)}}
                    variant={index === chosen ? "contained" : "text"}
                >
                    {item.ten}
                </Button>
            ))}
        </div>

        <div className="grid-item"> 
            <ProductList data = {chosen}/>
        </div>
    </div>
    </>
  ): (
    <div> 
      <p> Danh sách loại sản phẩm không tồn tại</p>
    </div>
  )
};

export default Product;
