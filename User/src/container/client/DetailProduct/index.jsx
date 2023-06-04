import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Reducers/todoCart";
import "./style.css";

export default function DetailProduct(props) {
  const { id } = useParams(props, "id");
  const listCart = useSelector((state) => state.todoCart.listCart);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const addtoCart = () => {
    dispatch(addToCart(listCart.data[id - 1]));
  };
  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost:5000/get-detail-product/${id}`
    );
    setProduct(res.data);
    setLoading(true);
  };
  useEffect(() => {
    fetchProduct();
    console.log("detail: " ,product)
  }, []);
  return (
    <div style={{ minHeight: "505px" }}>
      {loading === true ? (
        <div className="detail-product">
          <div class="navbar-detail">
            <Link to="/Product">
              <i class="bi bi-chevron-left" style={{ fontsize: 100 }}></i>
              Quay lại
            </Link>
          </div>
          <div className="productInfo container">
            <div className="row justify-content-center">
              <div className="col-4">
                <img
                  src={product.data[0].anh}
                  style={{
                    width: "300px",
                    maxheight: "300px",
                    margir: "0px 40px",
                  }}
                  alt="img"
                />
              </div>

              <div className="col-4">
                <h2
                  style={{
                    fontSize: "35px",
                    fontWeight: "500",
                    marginBottom: "20px",
                  }}
                >
                  {" "}
                  {product.data[0].ten}
                </h2>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-6">
                    <h4
                      style={{
                        float: "left",
                        fontSize: "16px",
                      }}
                    >
                      Giá: {product.data[0].giaBan}
                    </h4>
                  </div>
                  <div className="col-4">
                    <h4
                      style={{
                        float: "right",
                        fontSize: "16px",
                      }}
                    >
                      Số lượng: {product.data[0].soLuong}
                    </h4>
                  </div>
                </div>
                <p
                  className="mt-3"
                  style={{
                    fontSize: "15px",
                    marginBottom: "10px",
                  }}
                >
                  {product.data[0].moTa}
                </p>
                <Button
                  onClick={() => addtoCart()}
                  sx={{ fontSize: 10 }}
                  style={{ width: 120 }}
                  color="warning"
                  variant="contained"
                >
                  Thêm sản phẩm
                </Button>
              </div>
              <div className="col-4"> </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Hiện không có sản phẩm.</div>
      )}
    </div>
  );
}
