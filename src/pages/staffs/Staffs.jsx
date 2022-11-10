import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Table, Button } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as staffsApi from "../../api/staffsApi";
function Staffs() {
  const [staffs, setStaffs] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getStaffs = await staffsApi.get();
      setStaffs(getStaffs.staffs);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteCustomer = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      staffsApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };
  return (
    <div className="staff">
      <div className="staff-btn-add">
        <NavLink to="/staffs/add">
          <Button color="primary">Thêm nhân viên</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={index}>
              <td>{staff.nv_id}</td>
              <td>{staff.nv_hoten}</td>
              <td>
                {staff.nv_gioitinh === 0 ? "Nam": "Nữ"}
              </td>
              <td>{moment(staff.nv_ngaysinh).format("DD/MM/YYYY")}</td>
              <td>{staff.nv_email}</td>
              <td>{staff.nv_sdt}</td>
              <td>{staff.nv_diachi}</td>
              <td>
                <NavLink
                  to={`/staffs/update/${staff.nv_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteCustomer(staff.nv_id)}
                >
                  <RiDeleteBin6Line className="fs-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Staffs;
