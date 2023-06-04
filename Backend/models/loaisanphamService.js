const db = require('./db');


const CreateNewCategory = async (data) => {
    try {
        await db.execute(`INSERT INTO loaiSanPham (ten, moTa, anh) VALUES
        (?, ?, ?)`,
            data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


const ReadListCategory = async () => {
    try {
        const [rows, fields] = await db.execute(`SELECT * FROM loaiSanPham`);
        return rows;
    } catch (error) {
        console.error(err);
        throw err;
    }
}

const UpdateCategory = async (data) => {
    try {
        await db.execute(`UPDATE loaiSanPham SET ten = ?, moTa = ?, anh = ? WHERE maLoai = ?`, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const DeleteCategory = async (id) => {
    try {
        await db.execute(`DELETE FROM loaiSanPham WHERE maLoai = ?`, id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = {
    CreateNewCategory: CreateNewCategory,
    DeleteCategory: DeleteCategory,
    UpdateCategory: UpdateCategory,
    ReadListCategory: ReadListCategory
};