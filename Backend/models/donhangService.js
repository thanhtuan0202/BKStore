const db = require('./db');


const CreateNewOrder = async (data) => {
    try {
        await db.execute(`INSERT INTO donHang (id, tenKhach, SDT, diaChi, hinhThucThanhToan, ngayTao, idTaiKhoan) VALUES
        (?, ?, ?, ?, ?, ?, ?)`,
            data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


const ReadListOrder = async () => {
    try {
        const [rows, fields] = await db.execute(`SELECT * FROM donHang`);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const ReadOneOrder = async (id) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT * FROM donHang WHERE id = ?
        `, id);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const UpdateOrder = async (data) => {
    try {
        await db.execute(`UPDATE donHang SET tenKhach = ?, SDT = ?, diaChi = ?, hinhThucThanhToan = ?, ngayTao = ?, idTaiKhoan = ? WHERE id = ?`, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const DeleteOrder = async (id) => {
    try {
        await db.execute(`DELETE FROM donHang WHERE id = ?`, id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    CreateNewOrder : CreateNewOrder,
    ReadListOrder : ReadListOrder,
    UpdateOrder : UpdateOrder,
    DeleteOrder : DeleteOrder,
    ReadOneOrder : ReadOneOrder,
};