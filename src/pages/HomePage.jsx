import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const notableMembers = [
  {
    name: "Phan Chính Tín",
    title: "Nhị đại tổ",
    desc: "Khai khoa làng Trà Lũ, đỗ Hương cống, được ghi danh tại Văn Miếu Quốc Tử Giám.",
  },
  {
    name: "Phan Đình Tuấn",
    title: "Đời thứ 4",
    desc: "Đỗ Hương cống, làm quan, được phong Hầu tước - Tả hiệu úy An Sơn hầu.",
  },
  {
    name: "Phan Triều Thắng",
    title: "Đời thứ 6",
    desc: "Giữ chức Cai tổng, phân chia đinh điền và ruộng đất Trà Lũ thành ba thôn.",
  },
  {
    name: "Phan Bá Vành",
    title: "1790 - 1827",
    desc: "Thủ lĩnh cuộc khởi nghĩa nông dân lớn thời Nguyễn, căn cứ chính tại Trà Lũ.",
  },
];

const timeline = [
  {
    year: "1471",
    title: "Khởi phát tại Trà Giang",
    desc: "Đức Thủy tổ Phan Quý Công tự Chính Niệm từ Phượng Lũ về vùng sông Trà lập ấp.",
  },
  {
    year: "1783",
    title: "Xây dựng nhà thờ đầu tiên",
    desc: "Nhà thờ tổ được dựng lần đầu bằng đất, lợp rạ vào năm Cảnh Hưng 44.",
  },
  {
    year: "1807",
    title: "Xây dựng quy mô bề thế",
    desc: "Dưới triều Gia Long, nhà thờ tổ được xây dựng với quy mô lớn hơn.",
  },
  {
    year: "1883",
    title: "Đại trùng tu",
    desc: "Đợt đại trùng tu tạo nên diện mạo gần gần như ngày nay.",
  },
  {
    year: "2009",
    title: "Công nhận di tích",
    desc: "UBND tỉnh Nam Định công nhận là Di tích lịch sử văn hóa cấp tỉnh.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="home-hero">
        <img
          src="/nha-tho-to.png"
          alt="Nhà thờ tổ Phan Tộc"
          className="home-hero-image"
        />

        <div className="home-hero-overlay">
          <div className="home-badge">
            Di tích lịch sử văn hóa cấp tỉnh năm 2009
          </div>

          <h1>Nhà thờ tổ Phan Tộc</h1>

          <p>
            Thôn Trà Đông - Xuân Hưng - Ninh Bình
          </p>

          <button
            className="home-primary-button"
            onClick={() => navigate("/history")}
          >
            Xem lịch sử dòng họ
          </button>
        </div>
      </section>

      <section className="home-stats">
        <div className="stat-card">
          <span>Khởi phát</span>
          <strong>1471</strong>
          <p>Lê triều Hồng Đức</p>
        </div>

        <div className="stat-card">
          <span>Thủy tổ</span>
          <strong>Phan Quý Công</strong>
          <p>Tự Chính Niệm</p>
        </div>

        <div className="stat-card">
          <span>Truyền đời</span>
          <strong>15 - 16</strong>
          <p>Đời con cháu</p>
        </div>

        <div className="stat-card">
          <span>Ngành họ</span>
          <strong>5</strong>
          <p>Ngành tổ con</p>
        </div>
      </section>

      <section className="home-section two-columns">
        <div className="home-card intro-card">
          <h2>Giới thiệu Phan Tộc</h2>

          <p>
            Phan Tộc là dòng họ lớn, có truyền thống lâu đời tại vùng
            Trà Lũ Đông, nay thuộc xã Xuân Phương, huyện Xuân Trường,
            tỉnh Nam Định.
          </p>

          <p>
            Đức Thủy tổ Phan Quý Công tự Chính Niệm khởi phát từ Phượng Lũ,
            về vùng Trà Giang lập ấp vào năm 1471, dưới triều Hồng Đức.
          </p>

          <p>
            Trải qua nhiều thế hệ, Phan Tộc phát triển thành nhiều ngành họ,
            con cháu đông đúc, định cư trên nhiều vùng miền của Tổ quốc.
          </p>
        </div>

        <div className="home-card quote-card">
          <h2>Câu đối tiền đường</h2>

          <div className="quote-text">
            “Hồng Đức niên gian bồi đức thụ<br />
            Trà giang lạc thổ triệu nhân cơ”
          </div>

          <p>
            Dịch nghĩa: Năm Hồng Đức vun trồng lên phúc đức,
            đất sông Trà tốt đẹp dựng xây cơ đồ.
          </p>
        </div>
      </section>

      <section className="home-card">
        <div className="section-header">
          <div>
            <h2>Các mốc lịch sử tiêu biểu</h2>
            <p>Những dấu mốc quan trọng trong quá trình hình thành và phát triển.</p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("/history")}
          >
            Xem chi tiết
          </button>
        </div>

        <div className="timeline-list">
          {timeline.map((item) => (
            <div className="timeline-row" key={item.year}>
              <div className="timeline-year">{item.year}</div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-card">
        <div className="section-header">
          <div>
            <h2>Tiền nhân tiêu biểu</h2>
            <p>Những bậc tiền nhân có công với dòng họ, làng xã và quê hương.</p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("/history")}
          >
            Xem thêm
          </button>
        </div>

        <div className="notable-grid">
          {notableMembers.map((member) => (
            <div className="notable-card" key={member.name}>
              <div className="notable-avatar">
                {member.name.charAt(0)}
              </div>

              <div>
                <h3>{member.name}</h3>
                <span>{member.title}</span>
                <p>{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section two-columns">
        <div className="home-card">
          <h2>Vai trò cách mạng</h2>

          <p>
            Trong hai cuộc kháng chiến chống Pháp và Mỹ, Nhà thờ tổ Phan Tộc
            là cơ sở cách mạng quan trọng của địa phương, từng là nơi hội họp,
            kho vũ khí, nơi tập luyện du kích và cơ sở sơ tán của huyện.
          </p>
        </div>

        <div className="home-card">
          <h2>Nguồn tư liệu</h2>

          <ul className="source-list">
            <li>Phan Tộc thế phổ</li>
            <li>Phan Tộc bi ký tại nhà thờ Phan Tộc</li>
            <li>Hương ước làng Trà Lũ Đông năm 1940</li>
            <li>Trà Lũ xã chí</li>
          </ul>
        </div>
      </section>
    </div>
  );
}