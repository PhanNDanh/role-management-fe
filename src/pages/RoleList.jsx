import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, CardBody, Input, Table } from "reactstrap";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./RoleList.css";
import { searchRoles } from "../services/roleService";

export default function RoleList() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRoles = async (nextPage = page) => {
    try {
      const response = await searchRoles({
        keyword,
        status: status || null,
        page: nextPage,
        size,
      });

      setRoles(response.content || []);
      setTotalElements(response.totalElements || 0);
      setTotalPages(response.totalPages || 0);
    } catch (e) {
      console.error("Fetch roles failed:", e);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [page, size]);

  useEffect(() => {
    fetchRoles(0);
  }, [status]);

  const handleSearch = () => {
    setPage(0);
    fetchRoles(0);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(0);
  };

  return (
    <div className="role-page">
      <div className="role-header">
        <h2>Vai trò người dùng</h2>

        <Button className="btn-add">+ Thêm vai trò</Button>
      </div>

      <div className="role-filter-row">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            className="search-input"
            placeholder="Tìm theo mã hoặc tên vai trò"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <select
          className="status-select"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">Trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Ngừng hoạt động</option>
        </select>
      </div>

      <Card className="table-card">
        <CardBody className="table-body">
          <Table responsive className="role-table">
            <thead>
              <tr>
                <th>Mã vai trò</th>
                <th>Tên vai trò</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr key={role.id} onClick={() => navigate(`/roles/${role.id}`)}>
                  <td>{role.code}</td>
                  <td>{role.name}</td>
                  <td>{role.description || "--"}</td>
                  <td>
                    {role.status === 1 ? (
                      <Badge className="badge-active">Đang hoạt động</Badge>
                    ) : (
                      <Badge className="badge-inactive">Ngừng hoạt động</Badge>
                    )}
                  </td>

                  <td
                    className="action-cell"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BsThreeDotsVertical />
                  </td>
                </tr>
              ))}

              {roles.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-data">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="table-footer">
            <div>
              Hiển thị {roles.length} kết quả trong tổng số {totalElements}
            </div>

            <div className="pagination-box">
              <span>Số bản ghi:</span>

              <Input
                type="select"
                value={size}
                className="page-size-select"
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(0);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Input>

              <Button
                className="page-icon"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft />
              </Button>

              <span className="page-current">{page + 1}</span>

              <Button
                className="page-icon"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                <FaChevronRight />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}