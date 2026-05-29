import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <img
          src="../../public/nha-tho-to.png"
          alt="Nhà thờ tổ Phan Tộc"
          className="hero-image"
        />

        <div className="hero-overlay">
          <span className="hero-badge">
            Di tích lịch sử văn hóa cấp tỉnh năm 2009
          </span>

          <h1>Nhà thờ tổ Phan Tộc</h1>

          <p>
            Xuân Phương - Xuân Trường - Nam Định
          </p>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Thủy tổ</h3>
          <h2>Phan Quý Công</h2>
          <p>Tự Chính Niệm</p>
        </div>

        <div className="info-card">
          <h3>Niên đại</h3>
          <h2>Hồng Đức</h2>
          <p>1470 - 1497</p>
        </div>

        <div className="info-card">
          <h3>Di tích</h3>
          <h2>23/09/2009</h2>
          <p>Cấp tỉnh Nam Định</p>
        </div>

        <div className="info-card">
          <h3>Ngành họ</h3>
          <h2>5 ngành</h2>
          <p>5 nhà tổ lớn</p>
        </div>
      </div>

      <div className="content-card">
        <h2>Giới thiệu</h2>

        <p>
          Nhà thờ tổ Phan Tộc tại xã Xuân Phương, huyện Xuân Trường,
          tỉnh Nam Định là nơi thờ phụng Đức Thủy tổ Phan Quý Công tự Chính Niệm.
        </p>

        <p>
          Dòng họ Phan Tộc là một trong những dòng họ đầu tiên khai phá,
          lập nên làng Trà Lũ Đông và phát triển liên tục qua hơn
          15 - 16 đời con cháu.
        </p>

        <p>
          Ngày 23/09/2009, Nhà thờ tổ Phan Tộc được UBND tỉnh Nam Định
          công nhận là Di tích lịch sử văn hóa cấp tỉnh.
        </p>
      </div>

      <div className="timeline-card">
        <h2>Các mốc lịch sử</h2>

        <div className="timeline-item">
          <strong>1470 - 1497</strong>
          <span>
            Con cháu Phan Quý Công từ làng Phượng Lũ về vùng sông Trà lập ấp.
          </span>
        </div>

        <div className="timeline-item">
          <strong>1783</strong>
          <span>
            Xây dựng nhà thờ tổ đầu tiên.
          </span>
        </div>

        <div className="timeline-item">
          <strong>1807</strong>
          <span>
            Xây dựng quy mô lớn dưới triều Gia Long.
          </span>
        </div>

        <div className="timeline-item">
          <strong>1883</strong>
          <span>
            Đại trùng tu, hình thành diện mạo gần như hiện nay.
          </span>
        </div>

        <div className="timeline-item">
          <strong>2007</strong>
          <span>
            Xây dựng lại tiền đường.
          </span>
        </div>

        <div className="timeline-item">
          <strong>23/09/2009</strong>
          <span>
            Được công nhận là Di tích lịch sử văn hóa cấp tỉnh.
          </span>
        </div>
      </div>
    </div>
  );
}