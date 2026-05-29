import { useState } from "react";
import {
  FaHome,
  FaLandmark,
  FaSitemap,
  FaUsers,
  FaChurch,
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
} from "react-icons/fa";
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
            <div className="logo-title">Phan Quý</div>
            <div className="logo-subtitle">Nhà thờ tổ</div>
          </div>
        </div>

        <div className="menu-section-title">Nghiệp vụ dòng họ</div>

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
            <FaUsers />
            <span>Gia phả</span>
          </button>

          <button
            className={`menu-button ${isActive("/houses") ? "active" : ""}`}
            onClick={() => goToPage("/houses")}
          >
            <FaChurch />
            <span>Nhà thờ tổ</span>
          </button>

          <button
            className={`menu-button ${isActive("/history") ? "active" : ""}`}
            onClick={() => goToPage("/history")}
          >
            <FaBookOpen />
            <span>Lịch sử</span>
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
            <span>Ảnh tư liệu</span>
          </button>

          <button
            className={`menu-button ${isActive("/contributions") ? "active" : ""}`}
            onClick={() => goToPage("/contributions")}
          >
            <FaHeart />
            <span>Công đức</span>
          </button>
        </nav>

        <div className="menu-section-title system-title">Quản trị hệ thống</div>

        <nav className="sidebar-menu">
          <button
            className={`menu-button ${isActive("/users") ? "active" : ""}`}
            onClick={() => goToPage("/users")}
          >
            <FaUsers />
            <span>Người dùng</span>
          </button>

          <button
            className={`menu-button ${isActive("/roles") ? "active" : ""}`}
            onClick={() => goToPage("/roles")}
          >
            <FaUserShield />
            <span>Vai trò</span>
          </button>
        </nav>
      </aside>

      <div className="main-wrapper">
        <header className="navbar">
          <div>
            <div className="navbar-title">Hệ thống nhà thờ tổ Phan Quý</div>
            <div className="navbar-subtitle">
              Xóm 4, Xuân Phương, Xuân Trường, Nam Định
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
                  <button onClick={() => goToPage("/users")}>
                    <FaUsers />
                    Người dùng
                  </button>

                  <button onClick={() => goToPage("/roles")}>
                    <FaUserShield />
                    Vai trò
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
          © 2026 Nhà thờ tổ Phan Quý - Di tích lịch sử năm 2009
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;