import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import moment from "moment";
import * as receiptsApi from "../../api/receiptsApi";

function Receipts() {
  const [receipts, setReceipts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getReceipts = await receiptsApi.get();
      setReceipts(getReceipts.receipts);
    };
    fetchApi();
  }, []);

  return (
    <div className="receipt">
      <div className="receipt-btn-add">
        <NavLink to="/receipts/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
        <tr>
            <th colSpan={5} className="text-center text-white bg-info">Danh sách phiếu nhập</th>
          </tr>
          <tr>
            <th>id</th>
            <th>Nhân viên xử lý</th>
            <th>Thành tiền</th>
            <th>Ngày tạo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {receipts?.map((receipt, index) => (
            <tr key={index}>
              <td>{receipt.pn_id}</td>
              <td>{receipt.nhanvien.nv_hoten}</td>
              <td>{receipt.pn_thanhtien.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}</td>
              <td>{moment(receipt.pn_ngaytao).format("DD-MM-YYYY")}</td>
              <td className="text-center">
                <NavLink to={`/receipts/detail/${receipt.pn_id}`}>
                  <Button>Chi tiết</Button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Receipts;
