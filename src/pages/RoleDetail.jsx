import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";

import {
  getRoleDetail,
  getRolePermissions,
  updateRolePermissions,
} from "../services/roleService";

import "./RoleDetail.css";

export default function RoleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [expandedIds, setExpandedIds] = useState({});
  const [saving, setSaving] = useState(false);
  const [keyword, setKeyword] = useState("");

  const permissionFields = [
    "canView",
    "canCreate",
    "canEdit",
    "canDelete",
    "canImport",
    "canExport",
    "canApprove",
  ];

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const roleData = await getRoleDetail(id);
      const permissionData = await getRolePermissions(id);

      setRole(roleData);
      setPermissions(permissionData);

      const expanded = {};
      permissionData.forEach((item) => {
        expanded[item.funcId] = true;
      });
      setExpandedIds(expanded);
    } catch (error) {
      console.error(error);
    }
  };

  const isParent = (item) => {
    return item.children && item.children.length > 0;
  };

  const checked = (value) => {
    return value === 1 || value === true;
  };

  const getLeaves = (item) => {
    if (!isParent(item)) {
      return [item];
    }

    return item.children.flatMap(getLeaves);
  };

  const isAllChecked = (item) => {
    const leaves = getLeaves(item);

    if (leaves.length === 0) {
      return false;
    }

    return leaves.every((leaf) =>
      permissionFields.every((field) => checked(leaf[field]))
    );
  };

  const toggleExpand = (funcId) => {
    setExpandedIds((prev) => ({
      ...prev,
      [funcId]: !prev[funcId],
    }));
  };

  const updatePermission = (funcId, field, value, items) => {
    return items.map((item) => {
      if (item.funcId === funcId) {
        return {
          ...item,
          [field]: value ? 1 : 0,
        };
      }

      return {
        ...item,
        children: updatePermission(funcId, field, value, item.children || []),
      };
    });
  };

  const setAllChildrenPermissions = (item, value) => {
    if (!isParent(item)) {
      const updated = { ...item };

      permissionFields.forEach((field) => {
        updated[field] = value ? 1 : 0;
      });

      return updated;
    }

    return {
      ...item,
      children: item.children.map((child) =>
        setAllChildrenPermissions(child, value)
      ),
    };
  };

  const updateParentAll = (funcId, value, items) => {
    return items.map((item) => {
      if (item.funcId === funcId) {
        return setAllChildrenPermissions(item, value);
      }

      return {
        ...item,
        children: updateParentAll(funcId, value, item.children || []),
      };
    });
  };

  const handleCheckAll = (item, value) => {
    if (isParent(item)) {
      setPermissions((prev) => updateParentAll(item.funcId, value, prev));
      return;
    }

    let updated = { ...item };

    permissionFields.forEach((field) => {
      updated[field] = value ? 1 : 0;
    });

    setPermissions((prev) =>
      prev.map((root) => {
        if (root.funcId === item.funcId) {
          return updated;
        }

        return {
          ...root,
          children: updateParentAll(item.funcId, value, root.children || []),
        };
      })
    );
  };

  const handleSingleCheck = (funcId, field, value) => {
    setPermissions((prev) => updatePermission(funcId, field, value, prev));
  };

  const flattenPermissions = (items) => {
    return items.flatMap((item) => {
      if (isParent(item)) {
        return flattenPermissions(item.children || []);
      }

      return [
        {
          functionId: item.funcId,
          canView: item.canView || 0,
          canCreate: item.canCreate || 0,
          canEdit: item.canEdit || 0,
          canDelete: item.canDelete || 0,
          canImport: item.canImport || 0,
          canExport: item.canExport || 0,
          canApprove: item.canApprove || 0,
        },
      ];
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = flattenPermissions(permissions);

      await updateRolePermissions(id, payload);

      alert("Lưu phân quyền thành công");

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Lưu phân quyền thất bại");
    } finally {
      setSaving(false);
    }
  };

  const filterTree = (items) => {
    if (!keyword.trim()) {
      return items;
    }

    const searchText = keyword.toLowerCase();

    return items
      .map((item) => {
        const children = filterTree(item.children || []);
        const matched = item.name?.toLowerCase().includes(searchText);

        if (matched || children.length > 0) {
          return {
            ...item,
            children,
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const visiblePermissions = useMemo(() => {
    return filterTree(permissions);
  }, [permissions, keyword]);

  const renderRows = (items) => {
    return items.flatMap((item) => {
      const parent = isParent(item);
      const isOpen = expandedIds[item.funcId];

      const currentRow = (
        <tr key={item.funcId} className={parent ? "parent-row" : ""}>
          <td>
            <div
              className="function-name"
              style={{
                paddingLeft: `${item.level * 24}px`,
              }}
            >
              {parent ? (
                <button
                  type="button"
                  className="tree-toggle"
                  onClick={() => toggleExpand(item.funcId)}
                >
                  {isOpen ? "−" : "+"}
                </button>
              ) : (
                <span className="tree-space" />
              )}

              <span>{item.name}</span>
            </div>
          </td>

          <td>
            <input
              type="checkbox"
              checked={isAllChecked(item)}
              onChange={(e) => handleCheckAll(item, e.target.checked)}
            />
          </td>

          {parent ? (
            <td colSpan="7" className="parent-empty-cell">
              Nhóm chức năng
            </td>
          ) : (
            <>
              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canView)}
                  onChange={(e) =>
                    handleSingleCheck(item.funcId, "canView", e.target.checked)
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canCreate)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canCreate",
                      e.target.checked
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canEdit)}
                  onChange={(e) =>
                    handleSingleCheck(item.funcId, "canEdit", e.target.checked)
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canDelete)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canDelete",
                      e.target.checked
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canImport)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canImport",
                      e.target.checked
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canExport)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canExport",
                      e.target.checked
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canApprove)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canApprove",
                      e.target.checked
                    )
                  }
                />
              </td>
            </>
          )}
        </tr>
      );

      if (!parent || !isOpen) {
        return [currentRow];
      }

      return [currentRow, ...renderRows(item.children)];
    });
  };

  if (!role) {
    return <div className="role-detail-page">Đang tải...</div>;
  }

  return (
    <div className="role-detail-page">
      <div className="role-detail-header">
        <div>
          <button
            className="back-link"
            onClick={() => navigate("/roles")}
          >
            ← Quay lại
          </button>
        </div>

        <Button
          color="danger"
          className="save-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "Lưu phân quyền"}
        </Button>
      </div>

      <Card className="role-info-card">
        <CardBody>
          <div className="role-info-title">Chi tiết vai trò</div>

          <div className="role-info-grid">
            <div>
              <span>Mã vai trò</span>
              <strong>{role.code}</strong>
            </div>

            <div>
              <span>Tên vai trò</span>
              <strong>{role.name}</strong>
            </div>

            <div>
              <span>Mô tả</span>
              <strong>{role.description || "--"}</strong>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="role-tabs">
        <button className="active">Kiểm soát truy cập</button>
        <button>Danh sách người dùng</button>
      </div>

      <Card className="permission-card">
        <CardBody>
          <div className="permission-toolbar">
            <div>
              <h2>Cấu hình phân quyền</h2>
              <p>Chọn quyền tương ứng cho từng chức năng.</p>
            </div>

            <input
              className="search-function"
              placeholder="Tìm kiếm chức năng..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="permission-table-wrapper">
            <Table responsive className="permission-table">
              <thead>
                <tr>
                  <th>Tên chức năng</th>
                  <th>Tất cả</th>
                  <th>Xem</th>
                  <th>Tạo</th>
                  <th>Sửa</th>
                  <th>Xóa</th>
                  <th>Nhập</th>
                  <th>Xuất</th>
                  <th>Duyệt</th>
                </tr>
              </thead>

              <tbody>{renderRows(visiblePermissions)}</tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}