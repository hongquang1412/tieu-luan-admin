import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("infoStaff"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="navbar">
      <div className="navbar-wapper">
        <div>
          <h3>Chào mừng đến với trang quản trị</h3>
        </div>
        <div className="d-flex align-items-center">
          <div className="me-2 p-2 border border-info rounded-circle">
            <img
              src="/images/user.png"
              alt=""
              width="50"
            />
          </div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="bg-info border-0">
              {account.nv_hoten}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={(e) => {
                  localStorage.removeItem("infoStaff");
                  navigate("/login");
                }}
              >
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
