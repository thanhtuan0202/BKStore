import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { fetchCart, addToCart } from "../../redux/Reducers/todoCart";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function ProductItem(props) {
  const [loading, setLoading] = useState(false);
  const listCart = useSelector((state) => state.todoCart.listCart);
  const dispatch = useDispatch();

  const fetchListCart = async () => {
    const res = await axios.get("http://localhost:5000/read-list-product");
    dispatch(fetchCart(res.data));
    setLoading(true);
  };
  useEffect(() => {
    fetchListCart();
  }, []);
  useEffect(() => {
    console.log("ListCart: ", listCart);
  }, [loading]);

  const item = props.data;
  const linkToDetail = `detail/${item.id}`;
  const addtoCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <div className="">
      <div className="food-card">
        <div className="food-card_img">
          <img src={item.anh} alt="img" />
        </div>
        <div className="food-card_content">
          <div className="food-card_title-section overflow-hidden">
            <h4 className="food-card_title">
              <a href="#!" className="text-dark">
                <Link to={linkToDetail} key={item.id}>
                  {" "}
                  {item.ten}{" "}
                </Link>
              </a>
            </h4>
            <h2
              style={{ fontSize: 15, fontWeight: "bold" }}
              className="food-card_author"
            >
              Số lượng: {item.soLuong + " " + item.donVi}
            </h2>
          </div>
          <div className="d-flex">
            <div className="food-card_price">
              {" "}
              Giá bán:
              <span> {item.giaBan + " VND"}</span>
            </div>
            <div className="food-card_order-count">
              {item.soLuong > 0 ? (
                <Button
                  onClick={() => addtoCart()}
                  sx={{ fontSize: 10 }}
                  style={{ width: 120 }}
                  color="warning"
                  variant="contained"
                >
                  Thêm sản phẩm
                </Button>
              ) : (
                <Button
                  sx={{ fontSize: 10 }}
                  style={{ width: 120 }}
                  variant="contained"
                  disabled
                >
                  Hết hàng
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
