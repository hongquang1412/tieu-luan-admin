import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
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
      <Table bordered hover>
        <thead>
          <tr>
            <th colSpan={7} className="text-center text-white bg-info">
              Danh sách đơn hàng
            </th>
          </tr>
          <tr>
            <th>id</th>
            <th>Khách hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Thành tiền</th>
            <th>trạng thái đơn</th>
            <th>Thời gian giao hàng</th>
            <th></th>
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
                {order.dh_thoigiangh
                  ? moment(order.dh_thoigiangh).format("DD-MM-YYYY")
                  : "Đang cập nhật"}
              </td>
              <td className="text-center">
                <NavLink to={`/orders/detail/${order.dh_id}`}>
                  <Button color="secondary">Chi tiết</Button>
                </NavLink>
                &nbsp; &nbsp;
                {order.dh_trangthai !== "Hủy đơn" && (
                  <>
                    <NavLink to={`/orders/update/${order.dh_id}`}>
                      <Button color="info" className="text-white">
                        Cập nhật
                      </Button>
                    </NavLink>
                    &nbsp; &nbsp;
                    <Button
                      color="danger"
                      onClick={() => {
                        handleDeleteOrder(order.dh_id);
                      }}
                    >
                      Xóa
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Orders;
