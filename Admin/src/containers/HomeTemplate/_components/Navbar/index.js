import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo  from "./logoBK.png";
import { useDispatch } from "react-redux";
import { delLoginAction } from "../../LoginAdmin/loginAdmin";
function Admin() { // Rule 2: call hooks in function component
  const user = JSON.parse(localStorage.getItem("admin"));
  return <>{user.result.name}</>
}
function Logout() {
  alert("Đăng xuất thành công!");
  localStorage.removeItem("admin");
  // const dispatch = useDispatch();
  // dispatch(delLoginAction());
}
export default class Navbar extends Component {
  
  render() {
    
    return (
      <div>
        <nav className="navbar bg-white m-0 pl-4"
        style={{
          borderBottom: "1px solid gray",
        }}>
          <div className="d-flex align-items-center">
            <img src={logo} alt="" style={{height: "45px"}}/>
            <div style={{ margin: "0px 2px",alignItems: "center"}}>
              <h1 style={{fontSize: "20px",textAlign: "center"}} >BK Store</h1>
            </div>
          </div>
          <div>
            <div class="btn-group dropleft">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Admin/>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Thông tin</a>
                <div class="dropdown-divider"></div>
                <NavLink activeClassname="active" className="nav-link" to="/login" onClick = {Logout}>
                  <h5>Đăng xuất</h5>
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-sm bg-light navbar-light text-secondary shadow p-3 mb-5 bg-white rounded">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                activeClassname="active"
                className="nav-link"
                to="/san-pham"
              >
                <h5>Sản phẩm</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassname="active"
                className="nav-link"
                to="/danh-sach"
              >
                <h5>Danh sách đơn hàng</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassname="active"
                className="nav-link"
                to="/quan-ly"
              >
                <h5>Quản lý tài khoản</h5>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
