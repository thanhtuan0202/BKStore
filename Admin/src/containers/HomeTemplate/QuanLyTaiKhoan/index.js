import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const ManageAccounts = () => {
  const [accountList, setAccountList] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false); // Trạng thái xác nhận xóa
  const [accountToDelete, setAccountToDelete] = useState(null); // Tài khoản cần xóa
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/read-list-account"
      );
      const data = response.data;
      setAccountList(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAccount = () => {
    history.push("/create-account"); // Điều hướng sang trang "CreateAccount"
  };

  const handleDeleteAccount = (account) => {
    setAccountToDelete(account); // Lưu tài khoản cần xóa
    setConfirmDelete(true); // Hiển thị xác nhận xóa
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Ẩn xác nhận xóa
    setAccountToDelete(null); // Xóa tài khoản cần xóa
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/delete-account",
        {
          id: accountToDelete.id,
        }
      );
      console.log(response.data); // Kết quả từ API



      // Ẩn xác nhận xóa và xóa tài khoản cần xóa

      setAccountToDelete(null);
      setConfirmDelete(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
            <button onClick={handleConfirmDelete}>Xác nhận</button>
            <button onClick={handleCancelDelete}>Hủy</button>
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <h1>Quản lý tài khoản</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#2459AD",
              width: "15%",
              borderRadius: "10px",
            }}
          >
            <h4
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Nội bộ nhân viên
            </h4>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#2459AD",
              width: "15%",
              borderRadius: "10px",
              position: "absolute",
              right: "0",
            }}
            onClick={handleCreateAccount}
          >
            <h4
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <FaPlus className="icon" />
              Tạo tài khoản
            </h4>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #CCCCCC",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>STT</th>
              <th style={tableHeaderStyle}>Tên tài khoản</th>
              <th style={tableHeaderStyle}>Tên nhân viên</th>
              <th style={tableHeaderStyle}>Mật khẩu</th>
              <th style={tableHeaderStyle}>Vai trò</th>
              <th style={tableHeaderStyle}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : (
              accountList.data.map((account, index) => (
                <tr
                  key={account.id}
                  style={index === accountList.length - 1 ? lastRowStyle : null}
                >
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{account.userName}</td>
                  <td style={tableCellStyle}>{account.tenNhanVien}</td>
                  <td style={tableCellStyle}>{account.passWord}</td>
                  <td style={tableCellStyle}>{account.vaiTro}</td>
                  <td style={tableCellStyle}>
                    <FaEdit className="icon" style={{ cursor: "pointer" }} />
                    <FaTrash
                      className="icon"
                      onClick={() => handleDeleteAccount(account)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#2459AD",
  color: "#FFFFFF",
  fontSize: "14px",
  height: "36px",
  padding: "8px",
  textAlign: "center",
};

const tableCellStyle = {
  padding: "8px",
  borderBottom: "1px solid #CCCCCC",
  borderRight: "1px solid #CCCCCC",
  border: "1px solid #CCCCCC",
  borderRadius: "10px",
};

const lastRowStyle = {
  borderTop: "1px solid #CCCCCC",
};

export default ManageAccounts;
