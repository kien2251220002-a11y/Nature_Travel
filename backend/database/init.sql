-- Init Database Schema for Nature Travel Tour
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL,
  rating REAL DEFAULT 5.0,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tour_id INTEGER NOT NULL,
  booking_date TEXT NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  note TEXT,
  total_price REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tour_id) REFERENCES tours(id)
);

-- Seed Tours Data (12 high-quality tours)
INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Vịnh Hạ Long Kỳ Quan Thiên Nhiên', 'Quảng Ninh, Việt Nam', '3 ngày 2 đêm', 3500000, 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', 4.9, 'Khám phá Vịnh Hạ Long, một trong bảy kỳ quan thiên nhiên thế giới mới. Trải nghiệm du thuyền 5 sao sang trọng, chèo thuyền kayak qua các hang động đá vôi cổ kính và lướt qua những hòn đảo kỳ vĩ.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 1);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Khám Phá Sapa Hùng Vĩ', 'Lào Cai, Việt Nam', '2 ngày 1 đêm', 2100000, 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=800&q=80', 4.8, 'Hành trình trekking xuyên qua những thửa ruộng bậc thang tuyệt đẹp vùng Tây Bắc. Tìm hiểu nét văn hóa đặc sắc của đồng bào dân tộc H''Mông, Dao đỏ và chinh phục đỉnh đèo Ô Quy Hồ lẫm liệt.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 2);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Chinh Phục Hang Phong Nha Kẻ Bàng', 'Quảng Bình, Việt Nam', '4 ngày 3 đêm', 5200000, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 4.95, 'Thám hiểm hệ thống hang động đá vôi tráng lệ và lớn nhất thế giới tại Vườn Quốc Gia Phong Nha - Kẻ Bàng. Cảm nhận không khí mát lạnh như băng và ngắm nhìn những khối thạch nhũ hàng triệu năm tuổi.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 3);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Đà Lạt Thành Phố Sương Mù', 'Lâm Đồng, Việt Nam', '3 ngày 2 đêm', 1850000, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', 4.7, 'Hương vị cao nguyên trong lành hòa cùng rừng thông bạt ngàn của Đà Lạt. Thăm thác nước Datanla réo rắc, hồ Tuyền Lâm phẳng lặng và tận hưởng không gian ngập tràn hoa tươi lãng mạn.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 4);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Thiên Đường Biển Phú Quốc', 'Kiên Giang, Việt Nam', '3 ngày 2 đêm', 4200000, 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', 4.85, 'Thả mình bên bãi cát trắng mịn của Bãi Sao và ngắm hoàng hôn lộng lẫy tại Phú Quốc. Thưởng thức đặc sản ngọc trai, lặn ngắm san hô rực rỡ và thăm cơ sở sản xuất nước mắm truyền thống lâu đời.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 5);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Chinh Phục Đỉnh Fansipan Nóc Nhà Đông Dương', 'Lào Cai, Việt Nam', '2 ngày 2 đêm', 2900000, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', 4.92, 'Hành trình trèo đèo vách núi lý thú để tiến tới đỉnh cao 3.143m của đỉnh Fansipan. Vượt qua những tầng mây phủ mờ sương và chiêm ngưỡng toàn cảnh núi rừng Hoàng Liên Sơn tráng lệ từ đỉnh cao.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 6);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Tràng An Cổ Kính Ninh Bình', 'Ninh Bình, Việt Nam', '1 ngày', 950000, 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', 4.65, 'Ngồi thuyền chèo tay xuôi dòng sông Sào Khê lững lờ trôi, xuyên qua những dãy núi đá vôi dựng đứng cheo leo và khám phá khu quần thể di sản thế giới hỗn hợp Tràng An trữ tình cổ xưa.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 7);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Hồ Ba Bể - Thác Bản Giốc Kỳ Vĩ', 'Cao Bằng, Việt Nam', '3 ngày 2 đêm', 3200000, 'https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=800&q=80', 4.8, 'Hành trình hướng về miền viễn biên Đông Bắc. Chèo thuyền kayaking lướt trên lòng Hồ Ba Bể êm đềm xanh biếc, rồi sững sờ trước vẻ đẹp hùng tráng cuồn cuộn của dòng thác Bản Giốc hùng vĩ.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 8);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Cánh Đồng Vàng Mù Cang Chải', 'Yên Bái, Việt Nam', '3 ngày 2 đêm', 2450000, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', 4.75, 'Tận mắt chiêm ngưỡng bức tranh mùa vàng tuyệt diệu bậc nhất Việt Nam vào mùa lúa chín tháng 9 và tháng 10. Chụp ảnh lưu niệm tại mâm xôi nổi tiếng và hít hà hương lúa mới thơm ngát.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 9);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Vườn Quốc Gia Cát Bà & Vịnh Lan Hạ', 'Hải Phòng, Việt Nam', '2 ngày 1 đêm', 2300000, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', 4.6, 'Khám phá khu sinh quyển xanh đảo Cát Bà, lội rừng tìm khỉ đầu trắng quý hiếm rồi hạ thủy thuyền kayak dạo chơi len lỏi trên đại dương Vịnh Lan Hạ trong xanh tĩnh lặng.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 10);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Miền Tây Sông Nước Chợ Nổi Cái Răng', 'Cần Thơ, Việt Nam', '2 ngày 1 đêm', 1500000, 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80', 4.72, 'Hòa mình vào nếp sống mộc mạc yên bình vùng sông nước Cửu Long. Đi ghe len lỏi dạo quanh phiên Chợ Nổi Cái Răng đầy tấp nập buổi sớm mai và hái trái cây ngọt lịm tận vườn sai trĩu.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 11);

INSERT INTO tours (name, location, duration, price, image, rating, description)
SELECT 'Vườn Quốc Gia Bạch Mã Hoang Sơ', 'Thừa Thiên Huế, Việt Nam', '1 ngày', 1100000, 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80', 4.68, 'Chinh phục Bạch Mã Hải Vọng Đài lừng lẫy, ngắm nhìn toàn cảnh Đầm Cầu Hai xanh thẳm từ trên cao. Thỏa sức lội suối mát trong tại Ngũ Hồ róc rách và tắm mát dưới dòng Thác Đỗ Quyên kỳ vĩ.'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE id = 12);
