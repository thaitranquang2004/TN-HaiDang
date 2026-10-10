/* =========================================================
   ✏️ THÔNG TIN DÙNG CHUNG – SỬA 1 LẦN, ÁP DỤNG CHO MỌI THIỆP
   ========================================================= */
window.INVITE_CONFIG = {
  // Tân cử nhân
  name: "Hải Đăng",
  school: "Trường Đại học Tôn Đức Thắng",
  degree: "Tân Cử nhân <strong>Khoa Luật</strong> · Khoá 2022 – 2026",

  // Thời gian
  weekday: "Thứ Bảy",
  day: "17",
  month: "10",
  year: "2026",
  time: "10:30",
  arriveNote: "Vui lòng có mặt trước 15 phút",

  // Địa điểm
  venue: "Sảnh Tòa A",
  venueFull: "Sảnh Tòa A Trường Đại học Tôn Đức Thắng",
  address: "Số 19 Nguyễn Hữu Thọ, Phường Tân Hưng, TP HCM",
  parking: "Có bãi giữ xe máy &amp; ô tô trong khuôn viên trường.",
  mapQuery: "Đại học Tôn Đức Thắng, 19 Nguyễn Hữu Thọ",

  // Google Calendar (giờ UTC = giờ VN - 7). VD 10:30 VN -> 033000Z
  calendarStart: "20261017T033000Z",
  calendarEnd: "20261017T070000Z",

  // Lịch tháng: thứ của ngày 1 (1 = Thứ Hai ... 7 = Chủ Nhật) và số ngày trong tháng
  monthStartsOn: 4,
  daysInMonth: 31,

  quote: "“Tận tâm – Tôn trọng – Trách nhiệm.<br>Hôm nay khép lại giảng đường, ngày mai mở ra hành trình.”",

  // Album ảnh (đường dẫn tính từ thư mục gốc project)
  gallery: [
    { src: "images/ket-nap-dang.jpg", title: "Lễ kết nạp Đảng viên", caption: "15.11.2025 · Đảng bộ Trường ĐH Tôn Đức Thắng", pos: "center 35%" },
    { src: "images/portrait.jpg", title: "Áo xanh tình nguyện", caption: "Thanh niên Việt Nam · TDTU", pos: "center 25%" },
    { src: "images/khoa-luat.jpg", title: "Staff Khoa Luật", caption: "Faculty of Law · Ton Duc Thang University", pos: "center 30%" }
  ],
  portrait: "images/portrait.jpg"
};
