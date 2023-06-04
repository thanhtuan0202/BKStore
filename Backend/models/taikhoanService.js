const db = require('./db');


const CreateNewAccount = async (data) => {
    try {
        await db.execute(`INSERT INTO taiKhoan (userName, passWord, tenNhanVien, vaiTro) VALUES
        (?, ?, ?, ?)`,
            data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const LoginCheck = async (data) => {
    try{
        const [row,fields] = await db.execute(`SELECT * FROM  taiKhoan WHERE userName = ?`,data);
        return row;
    }
    catch(error){
        console.error(error)
        return false;
    }
}

const ReadListAccount = async () => {
    try {
        const [rows, fields] = await db.execute(`SELECT * FROM taiKhoan`);
        return rows;
    } catch (error) {
        console.error(err);
        throw err;
    }
}

const UpdateAccount = async (data) => {
    try {
        await db.execute(`UPDATE taiKhoan SET userName = ?, passWord = ?, tenNhanVien = ?, vaiTro = ? WHERE id = ?`, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const DeleteAccount= async (id) => {
    try {
        await db.execute(`DELETE FROM taiKhoan WHERE id = ?`, id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    CreateNewAccount : CreateNewAccount,
    ReadListAccount : ReadListAccount,
    UpdateAccount : UpdateAccount,
    DeleteAccount : DeleteAccount,
    LoginCheck: LoginCheck,
};