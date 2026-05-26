import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Table
} from "reactstrap";

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

  const fetchRoles = async () => {
    try {
      const response = await searchRoles({
        keyword,
        status: status || null,
        page,
        size
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

  const handleSearch = () => {
    setPage(0);
    fetchRoles();
  };

  const fromRecord = totalElements === 0 ? 0 : page * size + 1;
  const toRecord = page * size + roles.length;

  return (
    <div className="role-page">
      <div className="role-header">
        <div>
          <h2>Vai trò người dùng</h2>
          <p>Quản lý vai trò và phân quyền người dùng trong hệ thống</p>
        </div>

        <Button className="btn-add">
          + Thêm vai trò
        </Button>
      </div>

      <Card className="filter-card">
        <CardBody>
          <Row className="g-3 align-items-end">
            <Col md="5">
              <label>Mã / tên vai trò</label>
              <Input
                placeholder="Nhập mã hoặc tên vai trò..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </Col>

            <Col md="3">
              <label>Trạng thái</label>
              <Input
                type="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="1">Đang hoạt động</option>
                <option value="0">Ngừng hoạt động</option>
              </Input>
            </Col>

            <Col md="2">
              <Button
                color="primary"
                className="w-100 btn-search"
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="table-card">
        <CardBody className="table-body">
          <Table responsive hover className="role-table">
            <thead>
              <tr>
                <th>Mã vai trò</th>
                <th>Tên vai trò</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="role-row"
                  onClick={() => navigate(`/roles/${role.id}`)}
                >
                  <td>
                    <span className="role-code">{role.code}</span>
                  </td>

                  <td className="role-name">
                    {role.name}
                  </td>

                  <td className="text-muted">
                    {role.description || "--"}
                  </td>

                  <td>
                    {role.status === 1 ? (
                      <Badge className="badge-active">
                        Đang hoạt động
                      </Badge>
                    ) : (
                      <Badge className="badge-inactive">
                        Ngừng hoạt động
                      </Badge>
                    )}
                  </td>

                  <td
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="sm"
                      color="light"
                      className="action-btn"
                    >
                      ⋯
                    </Button>
                  </td>
                </tr>
              ))}

              {roles.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="table-footer">
            <div className="record-info">
              Hiển thị {fromRecord} - {toRecord} trong tổng số {totalElements} bản ghi
            </div>

            <div className="pagination-box">
              <span className="page-size-label">Số bản ghi:</span>

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
                size="sm"
                className="page-btn"
                disabled={page === 0}
                onClick={() => setPage(0)}
              >
                «
              </Button>

              <Button
                size="sm"
                className="page-btn"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                ‹
              </Button>

              <span className="page-current">
                {page + 1} / {totalPages || 1}
              </span>

              <Button
                size="sm"
                className="page-btn"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                ›
              </Button>

              <Button
                size="sm"
                className="page-btn"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(totalPages - 1)}
              >
                »
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}