import { useState } from "react";
import {
  FaHome,
  FaLandmark,
  FaSitemap,
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
  FaImages,
  FaHeart,
  FaCog,
  FaUserCircle,
  FaUserShield,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaPhoneAlt,
  FaUniversity,
  FaGraduationCap,
  FaMonument,
} from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import keycloak from "../config/keycloak";
import "./MainLayout.css";

function MainLayout({ children }) {
  const [settingOpen, setSettingOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = keycloak.tokenParsed || {};

  const goToPage = (path) => {
    navigate(path);
    setSettingOpen(false);
    setUserOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">祠</div>

          <div>
            <div className="logo-title">Phan Đại Tộc</div>
            <div className="logo-subtitle">
              Xuân Hưng - Ninh Bình
            </div>
          </div>
        </div>

        <div className="menu-section-title">THÔNG TIN DÒNG HỌ</div>

        <nav className="sidebar-menu">
          <button
            className={`menu-button ${isActive("/") ? "active" : ""}`}
            onClick={() => goToPage("/")}
          >
            <FaHome />
            <span>Trang chủ</span>
          </button>

          <button
            className={`menu-button ${isActive("/clan") ? "active" : ""}`}
            onClick={() => goToPage("/clan")}
          >
            <FaLandmark />
            <span>Dòng họ</span>
          </button>

          <button
            className={`menu-button ${isActive("/branches") ? "active" : ""}`}
            onClick={() => goToPage("/branches")}
          >
            <FaSitemap />
            <span>Ngành họ</span>
          </button>

          <button
            className={`menu-button ${isActive("/members") ? "active" : ""}`}
            onClick={() => goToPage("/members")}
          >
            <PiTreeStructureFill />
            <span>Gia phả</span>
          </button>

          <button
            className={`menu-button ${isActive("/history") ? "active" : ""}`}
            onClick={() => goToPage("/history")}
          >
            <FaBookOpen />
            <span>Lịch sử</span>
          </button>

          <button
            className={`menu-button ${isActive("/houses") ? "active" : ""}`}
            onClick={() => goToPage("/houses")}
          >
            <FaUniversity />
            <span>Nhà thờ tổ</span>
          </button>

          <button
            className={`menu-button ${isActive("/tombs") ? "active" : ""}`}
            onClick={() => goToPage("/tombs")}
          >
            <FaMonument />
            <span>Lăng mộ tổ tiên</span>
          </button>

          <button
            className={`menu-button ${isActive("/education") ? "active" : ""}`}
            onClick={() => goToPage("/education")}
          >
            <FaGraduationCap />
            <span>Khuyến học</span>
          </button>

          <button
            className={`menu-button ${isActive("/events") ? "active" : ""}`}
            onClick={() => goToPage("/events")}
          >
            <FaCalendarAlt />
            <span>Sự kiện</span>
          </button>

          <button
            className={`menu-button ${isActive("/media") ? "active" : ""}`}
            onClick={() => goToPage("/media")}
          >
            <FaImages />
            <span>Thư viện ảnh</span>
          </button>

          <button
            className={`menu-button ${isActive("/contributions") ? "active" : ""}`}
            onClick={() => goToPage("/contributions")}
          >
            <FaHeart />
            <span>Công đức</span>
          </button>

          <button
            className={`menu-button ${isActive("/contact") ? "active" : ""}`}
            onClick={() => goToPage("/contact")}
          >
            <FaPhoneAlt />
            <span>Liên hệ</span>
          </button>
        </nav>
      </aside>

      <div className="main-wrapper">
        <header className="navbar">
          <div>
            <div className="navbar-title">Hệ thống Phan Đại Tộc</div>
            <div className="navbar-subtitle">
              Nhà thờ tổ Phan Tộc - Xuân Phương, Xuân Trường, Nam Định
            </div>
          </div>

          <div className="navbar-actions">
            <div className="dropdown-wrapper">
              <button
                className="icon-button"
                onClick={() => {
                  setSettingOpen(!settingOpen);
                  setUserOpen(false);
                }}
              >
                <FaCog />
              </button>

              {settingOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-title">Quản trị hệ thống</div>

                  <button onClick={() => goToPage("/users")}>
                    <FaUsers />
                    Tài khoản quản trị
                  </button>

                  <button onClick={() => goToPage("/roles")}>
                    <FaUserShield />
                    Phân quyền hệ thống
                  </button>

                  <div className="dropdown-divider" />

                  <button onClick={() => goToPage("/settings")}>
                    <FaCog />
                    Cấu hình hệ thống
                  </button>
                </div>
              )}
            </div>

            <div className="dropdown-wrapper">
              <button
                className="user-button"
                onClick={() => {
                  setUserOpen(!userOpen);
                  setSettingOpen(false);
                }}
              >
                <FaUserCircle />
                <span>{userInfo.preferred_username || "User"}</span>
              </button>

              {userOpen && (
                <div className="dropdown-menu user-dropdown">
                  <div className="user-info">
                    <strong>
                      {userInfo.name || userInfo.preferred_username || "User"}
                    </strong>
                    <span>{userInfo.email || "No email"}</span>
                  </div>

                  <button>
                    <FaEdit />
                    Chỉnh sửa thông tin
                  </button>

                  <button>
                    <FaSave />
                    Lưu thông tin
                  </button>

                  <button className="logout-button" onClick={logout}>
                    <FaSignOutAlt />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">{children}</main>

        <footer className="footer">
          <div>
            © 2026 Phan Đại Tộc - Nhà thờ tổ Phan Tộc
            <br />
            <span>
              Tư liệu lịch sử, gia phả và hình ảnh được sưu tầm, biên soạn từ nguồn tư liệu của ông
              <strong> Phan Văn Chính</strong>.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;