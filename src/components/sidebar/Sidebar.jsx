import React from "react";
import { NavLink } from "react-router-dom";
function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <span className="sidebar-top-logo">logo</span>
      </div>
      <div className="sidebar-center">
        <ul className="list-unstyled m-0 p-0">
          <p className="sidebar-title">CHÍNH</p>
          <li className="sidebar-link">
            <NavLink to="/" className="text-decoration-none text-primary">TRANG CHỦ</NavLink>
          </li>
          <p className="sidebar-title">DANH SÁCH</p>
          <li className="sidebar-link">
            <NavLink to="/categories" className="text-decoration-none text-primary">Loại</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/products" className="text-decoration-none text-primary">Sản phẩm</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/colors" className="text-decoration-none text-primary">Màu sắc</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/capacities" className="text-decoration-none text-primary">Dung lượng</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/customers" className="text-decoration-none text-primary">Khách hàng</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/staffs" className="text-decoration-none text-primary">Nhận viên</NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink to="/orders" className="text-decoration-none text-primary">Đơn hàng</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default sidebar;
