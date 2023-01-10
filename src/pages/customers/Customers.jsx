import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
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
        <NavLink to="/customers/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
        <tr>
            <th colSpan={5} className="text-center text-white bg-info">Danh sách khách hàng</th>
          </tr>
          <tr>
            <th>id</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.kh_id}</td>
              <td>{customer.kh_hoten}</td>
              <td>{customer.kh_email}</td>
              <td>{customer.kh_sdt}</td>
              <td className="text-center">
                <NavLink to={`/customers/detail/${customer.kh_id}`}>
                  <Button color="secondary">Chi tiết</Button>
                </NavLink>
                &nbsp; &nbsp;
                <NavLink to={`/customers/update/${customer.kh_id}`}>
                  <Button color="info" className="text-white">
                    Cập nhật
                  </Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button
                  color="danger"
                  onClick={() => handleDeleteCustomer(customer.kh_id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Customers;
