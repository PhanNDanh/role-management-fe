import "./ClanPage.css";

export default function ClanPage() {
  return (
    <div className="clan-page">
      <div className="clan-hero">
        <div>
          <p className="clan-label">Dòng họ</p>
          <h1>Nhà thờ tổ họ Phan Quý</h1>
          <p>
            Xóm 4, Xuân Phương, Xuân Trường, Nam Định
          </p>
        </div>

        <div className="clan-badge">
          Di tích lịch sử năm 2009
        </div>
      </div>

      <div className="clan-grid">
        <div className="clan-card">
          <h3>Tổ cả</h3>
          <h2>Phan Quý Công</h2>
          <p>Tự Chính Niệm</p>
        </div>

        <div className="clan-card">
          <h3>Số ngành tổ con</h3>
          <h2>5 ngành</h2>
          <p>5 nhà tổ lớn phát triển các đời con cháu.</p>
        </div>

        <div className="clan-card">
          <h3>Địa chỉ</h3>
          <p>
            Xóm 4, Xuân Phương, Xuân Trường, Nam Định
          </p>
        </div>
      </div>
    </div>
  );
}