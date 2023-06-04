import React, { useState, useEffect } from "react";
import TempTable from "./chooseTable";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
export default function SanPhamPage() {
  const [choose, setChoose] = useState("");
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async(e) => {
    formData.soLuong = parseInt(formData.soLuong)
    formData.giaBan = parseInt(formData.giaBan).toFixed(2)
    formData.giaNhap = parseInt(formData.giaNhap).toFixed(2)
    formData.idLoaiSanPham = parseInt(formData.idLoaiSanPham)
    formData.anh  = "http://example.com"
    console.log(formData);
    try {
      const {data}  = await axios.post('http://localhost:5000/create-product',formData);
      console.log(data);
      return {
        errCode: data.success,
        errDetail: data.message,  
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div style={{ paddingLeft: "30px" }}>
      <h3>Danh sách sản phẩm </h3>
      <div
        className="container row"
        style={{ padding: "0px", margin: "0px", width: "100%" }}
      >
        <button
          type="button"
          class="btn btn-primary btn-block mb-4 col-2 border"
          onClick={() => {
            setChoose("product");
          }}
        >
          Sản phẩm
        </button>
        <div class="col-1"></div>
        <button
          type="button"
          class="btn btn-primary btn-block mb-4 col-2"
          onClick={() => {
            setChoose("category");
            console.log(choose);
          }}
        >
          Loại sản phẩm
        </button>
        <div class="col-5"></div>
        <button
          type="button"
          class="btn btn-primary btn-block mb-4 col-2"
          onClick={() => {
            setAdd(!add);
          }}
          data-toggle="modal"
          data-target= "#addproduct"
        >
          <FaPlus /> Thêm sản phẩm
        </button>
        {add && (
          <div
            className="modal fade"
            id="addproduct"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{"Edit Product"}</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    ref={React.createRef()}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Mã sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        name="id"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ten"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Mã loại sản phẩm</label>
                      <input
                        type="text"
                        className="form-control"
                        name="idLoaiSanPham"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Đơn vị</label>
                      <input
                        type="text"
                        className="form-control"
                        name="donVi"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Số lượng</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soLuong"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Giá bán</label>
                      <input
                        type="text"
                        className="form-control"
                        name="giaBan"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Giá nhập</label>
                      <input
                        type="text"
                        className="form-control"
                        name="giaNhap"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Mô tả</label>
                      <input
                        type="text"
                        className="form-control"
                        name="moTa"
                        onChange={handleOnChange}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        className="form-control mb-3 w-50"
        placeholder="Tìm kiếm"
      />
      ;
      <TempTable data={choose} />
    </div>
  );
}
