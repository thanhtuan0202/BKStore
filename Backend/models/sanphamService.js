const db = require('./db');

const CreateNewProduct = async (data) => {
    console.log(">>>>>>>>data: ", data);
    try {
        await db.execute(`INSERT INTO sanPham (ten, soLuong, moTa, donVi, anh, giaNhap, giaBan, idLoaiSanPham) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            data,
            (error, result, fields) => {
                console.log(result)
            });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const ReadListProduct = async () => {
    try {
        const [rows, fields] = await db.execute(`SELECT * FROM sanpham`);
        return rows;
    } catch (error) {
        console.error(err);
        throw err;
    }
}
const GetDetailProduct = async (id) => {
    try {
        const [rows, fields] = await db.execute(`SELECT * FROM sanpham WHERE id = ?`,id);
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
const UpdateProduct = async (data) => {
    try {
        await db.execute(`UPDATE sanpham SET ten = ?, soLuong = ?, moTa = ?, donVi = ?, anh = ?, giaNhap = ?, giaBan = ?, idLoaiSanPham = ? WHERE id = ?`,data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const DeleteProduct = async (id) => {
    try {
        await db.execute(`DELETE FROM sanpham WHERE id = ?`,id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


module.exports = {
    CreateNewProduct: CreateNewProduct,
    ReadListProduct: ReadListProduct,
    UpdateProduct : UpdateProduct,
    DeleteProduct : DeleteProduct,
    GetDetailProduct: GetDetailProduct,
};