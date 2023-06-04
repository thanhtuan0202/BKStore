const db = require('./db');

const ProductInOrder = async (id) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT idSanPham, ten AS tenSanPham, dathang.soLuong, moTa, donVi, anh, giaBan, dathang.soLuong * giaBan AS thanhTien
	    FROM dathang
        INNER JOIN sanpham ON dathang.idSanPham = sanpham.id
        WHERE dathang.idDonHang = ?
        `, id);
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const SumInOrder = async (id) => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT SUM(dathang.soLuong * giaBan) AS tongTien
	    FROM dathang
        INNER JOIN sanpham ON dathang.idSanPham = sanpham.id
        WHERE dathang.idDonHang = ?
        GROUP BY dathang.idDonHang;
        `, id);
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const CountOrder = async () => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT COUNT(*) AS soLuongDonHang
        FROM donHang
        `);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const GetRevenue = async () => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT SUM(giaBan) AS DoanhThu
	    FROM datHang 
        INNER JOIN sanPham ON sanPham.id = datHang.idSanPham
        `);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const GetProfit = async () => {
    try {
        const [rows, fields] = await db.execute(`
        SELECT SUM(giaBan - giaNhap) AS LoiNhuan
	    FROM datHang 
        INNER JOIN sanPham ON sanPham.id = datHang.idSanPham
        `);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const FindOrderById = async (idFind) => {
    try {
        const searchValue = `%${idFind}%`;
        const [rows, fields] = await db.execute(`
        SELECT * FROM donhang WHERE id LIKE ?
    `, [searchValue]);
    return rows; 
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const FindProductByName = async (nameFind) => {
    try {
        const searchValue = `%${nameFind}%`;
        const [rows, fields] = await db.execute(`
        SELECT * FROM sanpham WHERE ten LIKE ?
    `, [searchValue]);
    return rows; 
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const ProductIntoCategory = async (idCategory) => {
    try {
        const [rows, fields] = await db.execute(`
            SELECT * FROM sanpham WHERE idLoaiSanPham = ?
        `, idCategory);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};




module.exports = {
    ProductInOrder : ProductInOrder,
    SumInOrder : SumInOrder,
    CountOrder : CountOrder,
    GetRevenue : GetRevenue,
    GetProfit : GetProfit,
    FindOrderById : FindOrderById,
    FindProductByName : FindProductByName,
    ProductIntoCategory : ProductIntoCategory,
}