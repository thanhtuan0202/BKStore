const db = require("../models/db");
const {
  CreateNewProduct,
  ReadListProduct,
  UpdateProduct,
  DeleteProduct,
  GetDetailProduct,
} = require("../models/sanphamService");

const {
  CreateNewCategory,
  DeleteCategory,
  UpdateCategory,
  ReadListCategory,
} = require("../models/loaisanphamService");

const {
  CreateNewOrder,
  DeleteOrder,
  UpdateOrder,
  ReadListOrder,
  ReadOneOrder,
} = require("../models/donhangService");

const {
  CreateNewAccount,
  DeleteAccount,
  UpdateAccount,
  ReadListAccount,
  LoginCheck,
} = require("../models/taikhoanService");

const dathangService = require("../models/dathangService");
const feature = require("../models/feature");

const createProduct = async (req, res) => {
  const { ten, soLuong, moTa, donVi, anh, giaNhap, giaBan, idLoaiSanPham } =
    req.body;
  const data = [ten, soLuong, moTa, donVi, anh, giaNhap, giaBan, idLoaiSanPham];
  // console.log("data chuẩn bị được add: ", data);
  try {
    const messages = await CreateNewProduct(data);
    if (messages === false) {
      res.json({ success: false, message: "add product failed" });
    }
    // console.log("product added successfully");
    res.json({ success: true, message: "product added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const readListProduct = async (req, res) => {
  try {
    const data = await ReadListProduct();
    // console.log("data đọc được: ", data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: "error reading list product" });
    console.error(error);
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await GetDetailProduct([id]);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
  }
};
const updateProduct = async (req, res) => {
  const { id, ten, soLuong, moTa, donVi, anh, giaNhap, giaBan, idLoaiSanPham } =
    req.body;
  const data = [
    ten,
    soLuong,
    moTa,
    donVi,
    anh,
    giaNhap,
    giaBan,
    idLoaiSanPham,
    id,
  ];
  try {
    const success = await UpdateProduct(data);
    if (success === false)
      res.json({ success: false, message: "update failed" });
    res.json({ success: true, message: "update succeed" });
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const success = await DeleteProduct([id]);
    if (success === false)
      res.json({ success: false, message: "delete failed" });
    res.json({ success: true, message: "delete succeed" });
  } catch (error) {
    console.error(error);
  }
};

const findProductByName = async (req, res) => {
  try {
    const { nameFind } = req.body;
    console.log(nameFind);
    const productResult = await feature.FindProductByName([nameFind]);
    res.json({ success: true, productResult });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

////////////////////////////////

const createNewCategory = async (req, res) => {
  const { ten, moTa, anh } = req.body;
  const data = [ten, moTa, anh];
  try {
    const messages = await CreateNewCategory(data);
    if (messages === false) {
      res.json({ success: false, message: "add category failed" });
    }
    res.json({ success: true, message: "category added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const readListCategory = async (req, res) => {
  try {
    const data = await ReadListCategory();
    console.log("data đọc được: ", data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: "error reading list category" });
    console.error(error);
  }
};

const updateCategory = async (req, res) => {
  const { maLoai, ten, moTa, anh } = req.body;
  const data = [ten, moTa, anh, maLoai];
  try {
    const success = await UpdateCategory(data);
    if (success === false)
      res.json({ success: false, message: "update failed" });
    res.json({ success: true, message: "update succeed" });
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (req, res) => {
  const { maLoai } = req.body;
  try {
    const success = await DeleteCategory([maLoai]);
    if (success === false)
      res.json({ success: false, message: "delete failed" });
    res.json({ success: true, message: "delete succeed" });
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////////

const createIdCodeOrder = async () => {
  let idCode = "";
  while (idCode === "") {
    const newIdCode = `${Date.now().toString(36)}${Math.random()
      .toString(36)
      .substr(2, 5)}`;
    const [rows] = await db.execute("SELECT * FROM donHang WHERE id = ?", [
      newIdCode,
    ]);
    if (rows.length === 0) {
      idCode = newIdCode;
    }
  }
  return idCode;
};

const createNewOrder = async (req, res) => {
  const {
    tenKhach,
    SDT,
    diaChi,
    hinhThucThanhToan,
    ngayTao,
    idTaiKhoan,
    listProduct,
  } = req.body;
  try {
    const idcode = await createIdCodeOrder();
    const data1 = [
      idcode,
      tenKhach,
      SDT,
      diaChi,
      hinhThucThanhToan,
      ngayTao,
      idTaiKhoan,
    ];
    const message1 = await CreateNewOrder(data1);
    if (message1 === false)
      res.json({ success: false, message: "create order failed" });
    for (let i = 0; i < listProduct.length; i++) {
      let message2 = await dathangService.CreateNewOrderProduct([
        listProduct[i][0],
        idcode,
        listProduct[i][1],
      ]);
      if (message2 === false)
        res.json({ success: false, message: "add product in order failed" });
    }
    res.json({ success: true, message: "create order succeed" });
  } catch (error) {
    console.error(error);
  }
};

const readListOrder = async (req, res) => {
  try {
    const data = await ReadListOrder();
    // console.log("data đọc được: ", data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: "error reading list order" });
    console.error(error);
  }
};

const updateOrder = async (req, res) => {
  const { id, tenKhach, SDT, diaChi, hinhThucThanhToan, ngayTao, idTaiKhoan } =
    req.body;
  const data = [
    tenKhach,
    SDT,
    diaChi,
    hinhThucThanhToan,
    ngayTao,
    idTaiKhoan,
    id,
  ];
  try {
    const success = await UpdateOrder(data);
    if (success === false)
      res.json({ success: false, message: "update failed" });
    res.json({ success: true, message: "update succeed" });
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const success = await DeleteOrder([id]);
    if (success === false)
      res.json({ success: false, message: "delete failed" });
    res.json({ success: true, message: "delete succeed" });
  } catch (error) {
    console.error(error);
  }
};

////////////////////////////////////////////////////

const createNewAccount = async (req, res) => {
  const { userName, passWord, tenNhanVien, vaiTro } = req.body;
  const data = [userName, passWord, tenNhanVien, vaiTro];
  try {
    const messages = await CreateNewAccount(data);
    if (messages === false) {
      res.json({ success: false, message: "add account failed" });
    }
    res.json({ success: true, message: "account added successfully" });
  } catch (error) {
    console.error(error);
  }
};

const readListAccount = async (req, res) => {
  try {
    const data = await ReadListAccount();
    console.log("data đọc được: ", data);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: "error reading list account" });
    console.error(error);
  }
};

const updateAccount = async (req, res) => {
  const { id, userName, passWord, tenNhanVien, vaiTro } = req.body;
  const data = [userName, passWord, tenNhanVien, vaiTro, id];
  try {
    const success = await UpdateAccount(data);
    if (success === false)
      res.json({ success: false, message: "update failed" });
    res.json({ success: true, message: "update succeed" });
  } catch (error) {
    console.error(error);
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.body;
  try {
    const success = await DeleteAccount([id]);
    if (success === false)
      res.json({ success: false, message: "delete failed" });
    res.json({ success: true, message: "delete succeed" });
  } catch (error) {
    console.error(error);
  }
};
const logincheck = async (req, res) => {
  const { userName, passWord } = req.body;
  try {
    const customer = await LoginCheck([userName]);

    if (customer[0].passWord === passWord) {
      const result = {
        // email: customer[0].email,
        username: customer[0].userName,
        name: customer[0].tenNhanVien,
        id: customer[0].id,
      };
      res.json({
        message: "Đăng nhập thành công",
        result,
      });
    } else {
      res.status(403).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    res.status(403).send("Tài khoản hoặc mật khẩu không đúng");
  }
};
////////////////////////////////////////

const adminCheckOneOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const orderDetail = await ReadOneOrder([id]);
    const productInOrder = await feature.ProductInOrder([id]);
    const sumInOrder = await feature.SumInOrder([id]);
    res.json({ success: true, orderDetail, productInOrder, sumInOrder });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const adminManageOrder = async (req, res) => {
  try {
    const countOrder = await feature.CountOrder();
    const revenue = await feature.GetRevenue();
    const profit = await feature.GetProfit();
    const listOrder = await ReadListOrder();
    res.json({ success: true, countOrder, revenue, profit, listOrder });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findOrderById = async (req, res) => {
  try {
    const { idFind } = req.body;
    const orderResult = await feature.FindOrderById([idFind]);
    res.json({ success: true, orderResult });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const productIntoCategory = async (req, res) => {
  try {
    const listCategory = await ReadListCategory();
    let data = {};
    // let propertyName = "";
    let propertyValue = [];
    let count = 0;
    for (let i = 0; i < listCategory.length; i++) {
      // propertyName = listCategory[i].ten;
      propertyValue = await feature.ProductIntoCategory([
        listCategory[i].maLoai,
      ]);
      // data[propertyName] = propertyValue;
      data[count] = propertyValue;
      count++;
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createProduct: createProduct,
  readListProduct: readListProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getDetail: getDetail,
  findProductByName: findProductByName,

  createNewCategory: createNewCategory,
  readListCategory: readListCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,

  createNewOrder: createNewOrder,
  readListOrder: readListOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,

  createNewAccount: createNewAccount,
  readListAccount: readListAccount,
  updateAccount: updateAccount,
  deleteAccount: deleteAccount,
  logincheck: logincheck,

  adminCheckOneOrder: adminCheckOneOrder,
  adminManageOrder: adminManageOrder,
  findOrderById: findOrderById,
  productIntoCategory: productIntoCategory,
};
