import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleList from "./pages/RoleList";
import RoleDetail from "./pages/RoleDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleList />} />
        <Route path="/roles/:id" element={<RoleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}