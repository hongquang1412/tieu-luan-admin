import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDetail, BiEdit } from "react-icons/bi";
import * as ordersApi from "../../api/ordersApi";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const getOrder = await ordersApi.get();
      setOrders(getOrder.orders);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteOrder = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn hủy đơn không!");
    if (confirm) {
      await ordersApi._delete(id);
      setRender(true);
      alert("Hủy đơn thành công");
      navigate("/order");
    }
  };

  return (
    <div className="order">
      <h3>Danh sách đơn hàng</h3>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Khách hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Thành tiền</th>
            <th>trạng thái đơn</th>
            <th>Thời gian giao hàng</th>
            <th>Chi tiết</th>
            <th>Hủy đơn</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.dh_id}</td>
              <td>{order.khachhang?.kh_hoten}</td>
              <td>{order.dh_diachigh}</td>
              <td>
                {parseInt(order.dh_thanhtien).toLocaleString("VND", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{order.dh_trangthai}</td>
              <td>
                {order.dh_thoigiangh ? moment(order.dh_thoigiangh).format("DD-MM-YYYY") : "Đang cập nhật"}
              </td>
              <td>
                <NavLink
                  to={`/orders/detail/${order.dh_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiDetail className="fs-4" />
                </NavLink>
              </td>
              <td>
              <NavLink
                  to={`/orders/update/${order.dh_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <RiDeleteBin6Line
                  className="fs-4"
                  onClick={() => {
                    handleDeleteOrder(order.dh_id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Orders;
