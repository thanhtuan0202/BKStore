CREATE SCHEMA shopping;

USE shopping;

CREATE TABLE loaiSanPham (
	maLoai INT AUTO_INCREMENT,
    ten VARCHAR(45) NOT NULL,
    moTa VARCHAR(255) NOT NULL, 
    anh VARCHAR(255) NOT NULL, 
    PRIMARY KEY(maLoai)
);

CREATE TABLE taiKhoan (
	id INT AUTO_INCREMENT,
    userName VARCHAR(45) NOT NULL UNIQUE,
    passWord VARCHAR(50) NOT NULL, 
    tenNhanVien VARCHAR(50) NOT NULL, 
    vaiTro VARCHAR(50) NOT NULL, 
    PRIMARY KEY(id)
);

CREATE TABLE sanPham (
	id INT AUTO_INCREMENT,
    ten VARCHAR(45) NOT NULL,
    soLuong INT NOT NULL,
    moTa VARCHAR(255) NOT NULL, 
    donVi VARCHAR(40) NOT NULL,
    anh VARCHAR(255) NOT NULL, 
    giaNhap DECIMAL(10,2),
    giaBan DECIMAL(10,2),
    idLoaiSanPham INT,
    PRIMARY KEY (id),
    FOREIGN KEY (idLoaiSanPham) REFERENCES loaiSanPham (maLoai) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE donHang (
	id VARCHAR(15),
    tenKhach VARCHAR(45) NOT NULL,
    SDT VARCHAR(15) NOT NULL,
    diaChi VARCHAR(45) NOT NULL,
    hinhThucThanhToan VARCHAR(45) NOT NULL,
    ngayTao DATE,
    idTaiKhoan INT,
    PRIMARY KEY (id),
	FOREIGN KEY (idTaiKhoan) REFERENCES taiKhoan (id) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE datHang (
	idSanPham INT,
    idDonHang VARCHAR(15),
    soLuong INT DEFAULT 1,
    PRIMARY KEY (idSanPham, idDonHang),
	FOREIGN KEY (idSanPham) REFERENCES sanPham (id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (idDonHang) REFERENCES donHang (id) ON DELETE CASCADE ON UPDATE CASCADE 
);

INSERT INTO loaiSanPham (maLoai, ten, moTa, anh) VALUES
(1, 'Điện thoại', 'Điện thoại di động', 'https://example.com/dienthoai.jpg'),
(2, 'Máy tính', 'Máy tính để bàn và máy tính xách tay', 'https://example.com/maytinh.jpg'),
(3, 'Thiết bị gia dụng', 'Thiết bị gia dụng như tủ lạnh, máy giặt, máy hút bụi, ...', 'https://example.com/thietbigiadung.jpg'),
(4, 'Điện tử gia dụng', 'Thiết bị giải trí như TV, loa, máy nghe nhạc, ...', 'https://example.com/dientugiadung.jpg'),
(5, 'Thời trang', 'Quần áo, giày dép, phụ kiện thời trang', 'https://example.com/thoitrang.jpg'),
(6, 'Sức khỏe và làm đẹp', 'Sản phẩm chăm sóc sức khỏe và làm đẹp', 'https://example.com/suckhoevalamdep.jpg'),
(7, 'Đồ chơi', 'Đồ chơi cho trẻ em và người lớn', 'https://example.com/dochoi.jpg');

INSERT INTO taiKhoan (id, userName, passWord, tenNhanVien, vaiTro) VALUES
(1, 'admin', 'admin123', 'Nguyễn Văn A', 'Quản trị viên'),
(2, 'user1', 'user123', 'Trần Thị B', 'Quản trị viên'),
(3, 'user2', 'user456', 'Lê Văn C', 'Quản trị viên'),
(4, 'user3', 'user789', 'Phạm Thị D', 'Quản trị viên'),
(5, 'user4', 'userabc', 'Hoàng Văn E', 'Quản trị viên'),
(6, 'user5', 'userdef', 'Đỗ Thị F', 'Quản trị viên'),
(7, 'user6', 'userxyz', 'Trần Văn G', 'Quản trị viên');

INSERT INTO sanPham (id, ten, soLuong, moTa, donVi, anh, giaNhap, giaBan, idLoaiSanPham) VALUES
(1, 'Áo thun nam', 100, 'Áo thun nam cotton 100%', 'cái', 'https://example.com/aothunnam1.jpg', 50.00, 100.00, 1),
(2, 'Áo sơ mi nữ', 50, 'Áo sơ mi nữ phom dáng ôm', 'cái', 'https://example.com/aosomingu1.jpg', 80.00, 150.00, 2),
(3, 'Giày sneaker nam', 80, 'Giày sneaker nam da bò', 'đôi', 'https://example.com/giaysneakernam1.jpg', 120.00, 200.00, 3),
(4, 'Giày cao gót nữ', 30, 'Giày cao gót nữ mũi nhọn', 'đôi', 'https://example.com/giaycaogotnu1.jpg', 150.00, 300.00, 4),
(5, 'Quần jean nam', 120, 'Quần jean nam wash rách', 'cái', 'https://example.com/quanjeannam1.jpg', 70.00, 130.00, 1),
(6, 'Quần short nữ', 60, 'Quần short nữ phong cách Hàn Quốc', 'cái', 'https://example.com/quanshortnu1.jpg', 60.00, 120.00, 2),
(7, 'Túi xách nữ', 40, 'Túi xách nữ da cao cấp', 'cái', 'https://example.com/tuixachnu1.jpg', 100.00, 200.00, 5),
(8, 'iPhone 13', 50, 'Điện thoại di động cao cấp của Apple', 'cái', 'https://example.com/iphone13.jpg', 20000000, 25000000, 1),
(9, 'Samsung Galaxy S21', 100, 'Điện thoại di động cao cấp của Samsung', 'cái', 'https://example.com/samsungs21.jpg', 15000000, 20000000, 1),
(10, 'Dell XPS 13', 30, 'Máy tính xách tay cao cấp của Dell', 'cái', 'https://example.com/dellxps13.jpg', 30000000, 35000000, 2);


INSERT INTO donHang (id, tenKhach, SDT, diaChi, hinhThucThanhToan, ngayTao, idTaiKhoan) VALUES
(1, 'Nguyễn Văn A', '0901234567', '12 Nguyễn Văn Bảo, Quận Gò Vấp, TP.HCM', 'COD', '2022-01-01', 1),
(2, 'Trần Thị B', '0907654321', '3 Lê Văn Sỹ, Quận Phú Nhuận, TP.HCM', 'PayPal', '2022-02-05', 2),
(3, 'Phạm Văn C', '0987654321', '28 Nguyễn Tri Phương, Quận 10, TP.HCM', 'Credit card', '2022-03-12', 3),
(4, 'Lê Thị D', '0909876543', '100 Nguyễn Chí Thanh, Quận 5, TP.HCM', 'COD', '2022-03-23', 1),
(5, 'Trần Văn E', '0901234987', '25 Trần Hưng Đạo, Quận 1, TP.HCM', 'PayPal', '2022-04-05', 2),
(6, 'Nguyễn Thị F', '0901234098', '75 Nguyễn Văn Cừ, Quận 8, TP.HCM', 'Credit card', '2022-05-17', 3),
(7, 'Lê Văn G', '0904321098', '1 Phan Văn Trị, Quận Gò Vấp, TP.HCM', 'COD', '2022-06-30', 1);


-- INSERT INTO datHang (idSanPham, idDonHang) VALUES
-- (1, 1),
-- (3, 1),
-- (2, 2),
-- (4, 2),
-- (6, 3),
-- (7, 3),
-- (1, 4),
-- (2, 4),
-- (3, 4),
-- (4, 4),
-- (1, 5),
-- (5, 5),
-- (6, 6),
-- (7, 6),
-- (2, 7),
-- (4, 7);