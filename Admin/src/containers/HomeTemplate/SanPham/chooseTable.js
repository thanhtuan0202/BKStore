import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
export default function TempTable(props) {
  const types = props.data;
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [ploading, setPloading] = useState(true);
  const [cloading, setCloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const [data, setData] = useState({});

  const fetchProduct = async (e) => {
    try {
      const res = await axios.get("http://localhost:5000/read-list-product");
      console.log("res", res.data);
      setProduct(res.data);
      setPloading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProduct();
    console.log(product);
  }, [ploading]);

  const fetchCategory = async (e) => {
    try {
      const res = await axios.get("http://localhost:5000/read-list-category");
      setCategory(res.data);
      setCloading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [cloading]);

  const handleSubmit = async(e) => {
    data.soLuong = parseInt(formData.soLuong);
    data.giaBan = formData.giaBan;
    data.giaNhap = formData.giaNhap;
    console.log(data);
    try {
      const res  = await axios.post('http://localhost:5000/update-product',data);
      console.log(res);
      return {
        errCode: res.success,
        errDetail: res.message,  
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
  return types === "product" ? (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Đơn vị</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </tbody>
        {ploading === true ? (
          <div>Loading....</div>
        ) : (
          <tbody>
            {product.data.map((item, idx) => (
              <tr>
                <td>{item.id}</td>
                <td>
                  <img src={item.anh} alt="img" style={{ maxWidth: 50 }} />{" "}
                  {item.ten}
                </td>
                <td>{category.data[item.idLoaiSanPham].ten}</td>
                <td>{item.donVi}</td>
                <td>{item.giaNhap}</td>
                <td>{item.giaBan}</td>
                <td>{item.soLuong}</td>
                <td>
                  <FaEdit
                    onClick={() => {setOpen(!open);setFormData(item);setData(item)}}
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target={`#${types}`}
                  />
                  {open && (
                    <div
                      className="modal fade"
                      id={types}
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
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name="id"
                                  value={data.id}
                                />
                              </div>

                              <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name="id"
                                  value={data.ten}
                                />
                              </div>

                              <div className="form-group">
                                <label>Giá bán</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="giaBan"
                                  onChange={handleOnChange}
                                  value={formData.giaBan || data.giaBan}
                                />
                              </div>

                              <div className="form-group">
                                <label>Giá nhập</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="giaNhap"
                                  onChange={handleOnChange}
                                  value={formData.giaNhap || data.giaNhap}
                                />
                              </div>

                              <div className="form-group">
                                <label>Số lượng</label>
                                <input  
                                  type="text"
                                  className="form-control"
                                  name="soLuong"
                                  onChange={handleOnChange}
                                  value={formData.soLuong || data.soLuong}
                                />
                              </div>
                              <button type="submit" className="btn btn-success" >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  ) : (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th>STT</th>
            <th>Tên loại sản phẩm</th>
            <th>Mô Tả</th>
            <th></th>
          </tr>
        </tbody>

        {cloading === true ? (
          <div>Loading....</div>
        ) : (
          <tbody>
            {category.data.map((item, idx) => (
              <tr>
                <td>{item.maLoai}</td>
                <td>
                  <img src={item.anh} alt="" style={{ maxWidth: 50 }} />
                  {item.ten}
                </td>
                <td>{item.moTa}</td>
                <td>
                  <FaEdit />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
