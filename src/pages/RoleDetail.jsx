import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";

import {
  getRoleDetail,
  getRolePermissions,
  updateRolePermissions
} from "../services/roleService";

import "./RoleDetail.css";

export default function RoleDetail() {

  // =========================================================
  // ROUTER
  // =========================================================

  const { id } = useParams();

  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [role, setRole] = useState(null);

  const [permissions, setPermissions] = useState([]);

  const [expandedIds, setExpandedIds] = useState({});

  const [saving, setSaving] = useState(false);

  // =========================================================
  // PERMISSION FIELDS
  // =========================================================

  const permissionFields = [
    "canView",
    "canCreate",
    "canEdit",
    "canDelete",
    "canImport",
    "canExport",
    "canApprove"
  ];

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {

    try {

      const roleData = await getRoleDetail(id);

      const permissionData = await getRolePermissions(id);

      setRole(roleData);

      setPermissions(permissionData);

      // mặc định mở tất cả node cha
      const expanded = {};

      permissionData.forEach(item => {
        expanded[item.funcId] = true;
      });

      setExpandedIds(expanded);

    } catch (error) {

      console.error(error);

    }
  };

  // =========================================================
  // CHECK PARENT
  // =========================================================

  const isParent = (item) => {
    return item.children && item.children.length > 0;
  };

  // =========================================================
  // CHECK BOOLEAN
  // =========================================================

  const checked = (value) => {
    return value === 1 || value === true;
  };

  // =========================================================
  // GET ALL CHILD LEAVES
  // =========================================================

  const getLeaves = (item) => {

    if (!isParent(item)) {
      return [item];
    }

    return item.children.flatMap(getLeaves);
  };

  // =========================================================
  // CHECK ALL
  // =========================================================

  const isAllChecked = (item) => {

    const leaves = getLeaves(item);

    if (leaves.length === 0) {
      return false;
    }

    return leaves.every((leaf) =>
      permissionFields.every((field) => checked(leaf[field]))
    );
  };

  // =========================================================
  // EXPAND COLLAPSE TREE
  // =========================================================

  const toggleExpand = (funcId) => {

    setExpandedIds(prev => ({
      ...prev,
      [funcId]: !prev[funcId]
    }));
  };

  // =========================================================
  // UPDATE SINGLE CHECKBOX
  // =========================================================

  const updatePermission = (
    funcId,
    field,
    value,
    items
  ) => {

    return items.map(item => {

      if (item.funcId === funcId) {

        return {
          ...item,
          [field]: value ? 1 : 0
        };
      }

      return {
        ...item,
        children: updatePermission(
          funcId,
          field,
          value,
          item.children || []
        )
      };
    });
  };

  // =========================================================
  // UPDATE CHILDREN
  // =========================================================

  const setAllChildrenPermissions = (
    item,
    value
  ) => {

    // function con
    if (!isParent(item)) {

      const updated = { ...item };

      permissionFields.forEach(field => {
        updated[field] = value ? 1 : 0;
      });

      return updated;
    }

    // function cha
    return {
      ...item,
      children: item.children.map(child =>
        setAllChildrenPermissions(child, value)
      )
    };
  };

  // =========================================================
  // UPDATE PARENT CHECKBOX
  // =========================================================

  const updateParentAll = (
    funcId,
    value,
    items
  ) => {

    return items.map(item => {

      if (item.funcId === funcId) {

        return setAllChildrenPermissions(item, value);
      }

      return {
        ...item,
        children: updateParentAll(
          funcId,
          value,
          item.children || []
        )
      };
    });
  };

  // =========================================================
  // CHECK ALL HANDLER
  // =========================================================

  const handleCheckAll = (
    item,
    value
  ) => {

    // node cha
    if (isParent(item)) {

      setPermissions(prev =>
        updateParentAll(item.funcId, value, prev)
      );

      return;
    }

    // node con
    let updated = { ...item };

    permissionFields.forEach(field => {
      updated[field] = value ? 1 : 0;
    });

    setPermissions(prev =>
      prev.map(root => {

        if (root.funcId === item.funcId) {
          return updated;
        }

        return {
          ...root,
          children: updateParentAll(
            item.funcId,
            value,
            root.children || []
          )
        };
      })
    );
  };

  // =========================================================
  // SINGLE CHECKBOX
  // =========================================================

  const handleSingleCheck = (
    funcId,
    field,
    value
  ) => {

    setPermissions(prev =>
      updatePermission(
        funcId,
        field,
        value,
        prev
      )
    );
  };

  // =========================================================
  // FLATTEN TREE
  // =========================================================

  const flattenPermissions = (items) => {

    return items.flatMap(item => {

      // function cha không save
      if (isParent(item)) {

        return flattenPermissions(
          item.children || []
        );
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
          canApprove: item.canApprove || 0
        }
      ];
    });
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async () => {

    try {

      setSaving(true);

      const payload = flattenPermissions(
        permissions
      );

      await updateRolePermissions(
        id,
        payload
      );

      alert("Lưu phân quyền thành công");

      await fetchData();

    } catch (error) {

      console.error(error);

      alert("Lưu phân quyền thất bại");

    } finally {

      setSaving(false);
    }
  };

  // =========================================================
  // RENDER TREE
  // =========================================================

  const renderRows = (items) => {

    return items.flatMap(item => {

      const parent = isParent(item);

      const isOpen = expandedIds[item.funcId];

      const currentRow = (

        <tr
          key={item.funcId}
          className={parent ? "parent-row" : ""}
        >

          {/* ================================================= */}
          {/* FUNCTION NAME */}
          {/* ================================================= */}

          <td>

            <div
              className="function-name"
              style={{
                paddingLeft: `${item.level * 28}px`
              }}
            >

              {parent ? (

                <button
                  type="button"
                  className="tree-toggle"
                  onClick={() =>
                    toggleExpand(item.funcId)
                  }
                >
                  {isOpen ? "−" : "+"}
                </button>

              ) : (

                <span className="tree-space" />

              )}

              <span>{item.name}</span>

            </div>

          </td>

          {/* ================================================= */}
          {/* CHECK ALL */}
          {/* ================================================= */}

          <td>

            <input
              type="checkbox"
              checked={isAllChecked(item)}
              onChange={(e) =>
                handleCheckAll(
                  item,
                  e.target.checked
                )
              }
            />

          </td>

          {/* ================================================= */}
          {/* PARENT */}
          {/* ================================================= */}

          {parent ? (

            <td
              colSpan="7"
              className="parent-empty-cell"
            />

          ) : (

            <>
              {/* VIEW */}

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canView)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canView",
                      e.target.checked
                    )
                  }
                />
              </td>

              {/* CREATE */}

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

              {/* EDIT */}

              <td>
                <input
                  type="checkbox"
                  checked={checked(item.canEdit)}
                  onChange={(e) =>
                    handleSingleCheck(
                      item.funcId,
                      "canEdit",
                      e.target.checked
                    )
                  }
                />
              </td>

              {/* DELETE */}

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

              {/* IMPORT */}

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

              {/* EXPORT */}

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

              {/* APPROVE */}

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

      // đóng node
      if (!parent || !isOpen) {
        return [currentRow];
      }

      // mở node
      return [
        currentRow,
        ...renderRows(item.children)
      ];
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!role) {
    return (
      <div className="role-detail-page">
        Đang tải...
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="role-detail-page">

      {/* ================================================= */}
      {/* TOP BAR */}
      {/* ================================================= */}

      <div className="top-bar">

        <Button
          color="light"
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Quay lại quản lý role
        </Button>

        <Button
          color="danger"
          className="detail-action"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Đang lưu..."
            : "Lưu phân quyền"}
        </Button>

      </div>

      {/* ================================================= */}
      {/* TITLE */}
      {/* ================================================= */}

      <h1>Chi tiết vai trò</h1>

      {/* ================================================= */}
      {/* INFO */}
      {/* ================================================= */}

      <Card className="info-card">

        <CardBody>

          <h3>Thông tin chung</h3>

          <div className="info-grid">

            <div className="info-label">
              Mã vai trò
            </div>

            <div>{role.code}</div>

            <div className="info-label">
              Tên vai trò
            </div>

            <div>{role.name}</div>

            <div className="info-label">
              Mô tả
            </div>

            <div>
              {role.description || "--"}
            </div>

          </div>

        </CardBody>

      </Card>

      {/* ================================================= */}
      {/* TAB */}
      {/* ================================================= */}

      <div className="tabs">

        <div className="tab active">
          Kiểm soát truy cập
        </div>

        <div className="tab">
          Danh sách người dùng
        </div>

      </div>

      {/* ================================================= */}
      {/* PERMISSION */}
      {/* ================================================= */}

      <Card className="permission-card">

        <CardBody>

          {/* SEARCH */}

          <input
            className="search-function"
            placeholder="🔍  Tìm kiếm chức năng"
          />

          {/* TABLE */}

          <Table
            responsive
            className="permission-table"
          >

            <thead>

              <tr>

                <th>Tên chức năng</th>

                <th>Truy cập tất cả</th>

                <th>Xem</th>

                <th>Tạo</th>

                <th>Chỉnh sửa</th>

                <th>Xóa</th>

                <th>Nhập</th>

                <th>Xuất</th>

                <th>Phê duyệt</th>

              </tr>

            </thead>

            <tbody>

              {renderRows(permissions)}

            </tbody>

          </Table>

        </CardBody>

      </Card>

    </div>
  );
}