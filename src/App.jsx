import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import RoleList from "./pages/RoleList";
import RoleDetail from "./pages/RoleDetail";
import ClanPage from "./pages/ClanPage";
import HomePage from "./pages/HomePage";

function PlaceholderPage({ title, description }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>{title}</h2>
      <p style={{ color: "#6b7280" }}>{description}</p>
    </div>
  );
}

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/clan" element={<ClanPage />} />

        <Route
          path="/branches"
          element={
            <PlaceholderPage
              title="Ngành họ"
              description="Quản lý 5 ngành tổ con và các nhà tổ lớn."
            />
          }
        />

        <Route
          path="/members"
          element={
            <PlaceholderPage
              title="Gia phả"
              description="Quản lý thành viên, đời thế hệ, quan hệ cha mẹ con."
            />
          }
        />

        <Route
          path="/houses"
          element={
            <PlaceholderPage
              title="Nhà thờ tổ"
              description="Thông tin nhà thờ tổ cả và các nhà tổ ngành."
            />
          }
        />

        <Route
          path="/history"
          element={
            <PlaceholderPage
              title="Lịch sử"
              description="Bài viết lịch sử hình thành và phát triển dòng họ."
            />
          }
        />

        <Route
          path="/events"
          element={
            <PlaceholderPage
              title="Sự kiện"
              description="Giỗ tổ, họp họ, lễ cúng, tu sửa nhà thờ tổ."
            />
          }
        />

        <Route
          path="/media"
          element={
            <PlaceholderPage
              title="Ảnh tư liệu"
              description="Hình ảnh, video, tài liệu về dòng họ và nhà thờ tổ."
            />
          }
        />

        <Route
          path="/contributions"
          element={
            <PlaceholderPage
              title="Công đức"
              description="Quản lý đóng góp công đức của con cháu."
            />
          }
        />

        <Route
          path="/users"
          element={
            <PlaceholderPage
              title="Người dùng hệ thống"
              description="Quản lý tài khoản đăng nhập và người dùng quản trị."
            />
          }
        />

        <Route path="/roles" element={<RoleList />} />
        <Route path="/roles/:id" element={<RoleDetail />} />
      </Routes>
    </MainLayout>
  );
}

export default App;