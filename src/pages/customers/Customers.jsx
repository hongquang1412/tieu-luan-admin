import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { BiEdit, BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as customersApi from "../../api/customersApi";
function Customers() {
  const [customers, setCustomer] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getCustomers = await customersApi.get();
      setCustomer(getCustomers.customers);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteCustomer = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      customersApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };
  return (
    <div className="customer">
      <div className="customer-btn-add">
        <NavLink to="/customers/add">
          <Button color="primary">Thêm khách hàng</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Chi tiết</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.kh_id}</td>
              <td>{customer.kh_hoten}</td>
              <td>{customer.kh_email}</td>
              <td>{customer.kh_sdt}</td>
              <td>
                <NavLink
                  to={`/customers/detail/${customer.kh_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiDetail className="fs-4" />
                </NavLink>
              </td>
              <td>
                <NavLink
                  to={`/customers/update/${customer.kh_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteCustomer(customer.kh_id)}
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

export default Customers;
