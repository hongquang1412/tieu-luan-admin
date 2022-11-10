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
        <div className="navbar-wapper-search">
          <input
            className="border-0"
            type="text"
            name=""
            id=""
            placeholder="Tìm kiếm"
          />
          <FiSearch className="fs-4 ms-1" />
        </div>

        <div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret className="bg-primary border-0">{account.nv_hoten}</DropdownToggle>
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
