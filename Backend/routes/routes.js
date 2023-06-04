const express = require('express');
const router = express.Router();

const {
    createProduct,
    readListProduct,
    updateProduct,
    deleteProduct,
    getDetail,
    findProductByName,

    createNewCategory,
    readListCategory,
    updateCategory,
    deleteCategory,

    createNewOrder,
    readListOrder,
    updateOrder,
    deleteOrder,

    createNewAccount,
    readListAccount,
    updateAccount,
    deleteAccount,
    logincheck,

    adminCheckOneOrder,
    adminManageOrder,
    findOrderById,
    productIntoCategory,
} = require('../controller/controller')

router.post('/create-product', createProduct); // tạo sản phẩm 
router.get('/read-list-product', readListProduct);// gọi dữ liệu danh sách sản phẩm
router.post('/update-product', updateProduct);// update sản phẩm
router.post('/delete-product', deleteProduct);// xóa sản phẩm theo id
router.post('/find-product-by-name', findProductByName); //tìm kiếm sản phẩm theo tên
router.get('/get-detail-product/:id',getDetail)

router.post('/create-category', createNewCategory);
router.get('/read-list-category', readListCategory); // gọi dữ liệu danh sách loại sản phẩm
router.post('/update-category', updateCategory);
router.post('/delete-category', deleteCategory);

router.post('/create-order', createNewOrder);
router.get('/read-list-order', readListOrder);
router.post('/update-order', updateOrder);
router.post('/delete-order', deleteOrder);

router.post('/create-account', createNewAccount);
router.get('/read-list-account', readListAccount);
router.post('/update-account', updateAccount);
router.post('/delete-account', deleteAccount);
router.post('/login-account',logincheck)

router.post('/admin-check-order', adminCheckOneOrder); // lấy dữ liệu chi tiết của 1 đơn hàng
router.get('/admin-manage-order', adminManageOrder); // lấy dữ liệu của trang quản lý đơn hàng
router.post('/find-order-by-id', findOrderById); // tìm kiếm đơn đặt hàng theo id
router.get('/list-product-into-category', productIntoCategory); // Lấy list sản phẩm theo danh mục



router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to backend zone!'});
})

module.exports = router;