import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";
import * as ordersApi from "../../api/ordersApi";
function DataTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getOrders = await ordersApi.getDetails("", 5);
      setOrders(getOrders.orders);
    };
    fetchApi();
  }, []);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Tên khách hàng</th>
            <th>Thành tiền</th>
            <th>ngày đặt hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr>
              <td>{order.khachhang.kh_hoten}</td>
              <td>
                {parseInt(order.dh_thanhtien).toLocaleString("VND", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
