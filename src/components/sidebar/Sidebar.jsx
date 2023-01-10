import React from "react";
import { NavLink } from "react-router-dom";
function sidebar() {
  const sidebarClass = ({ isActive }) => {
    return isActive ? "sidebar-link-title-active" : "sidebar-link-title"
  };  

 return(
    <div className="sidebar">
      <div className="sidebar-top">
        <span className="sidebar-top-logo">QLBH</span>
      </div>
      <div className="sidebar-center">
        <ul className="list-unstyled m-0 p-0">
          <p className="sidebar-title mt-0">CHÍNH</p>
          <li className="sidebar-link">
            <NavLink
              to="/"
              className={sidebarClass}
              end
            >
              TRANG CHỦ
            </NavLink>
          </li>
          <p className="sidebar-title">DANH SÁCH</p>
          <li className="sidebar-link">
            <NavLink
              to="/categories"
              className={sidebarClass}
            >
              LOẠI
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/products"
              className={sidebarClass}
            >
              SẢN PHẨM
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/colors"
              className={sidebarClass}
            >
              MÀU SẮC
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/capacities"
              className={sidebarClass}
            >
              DUNG LƯỢNG
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/customers"
              className={sidebarClass}
            >
              KHÁCH HÀNG
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/staffs"
              className={sidebarClass}
            >
              NHÂN VIÊN
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/orders"
              className={sidebarClass}
            >
              ĐƠN HÀNG
            </NavLink>
          </li>
          <li className="sidebar-link">
            <NavLink
              to="/receipts"
              className={sidebarClass}
            >
              PHIẾU NHẬP
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default sidebar;
