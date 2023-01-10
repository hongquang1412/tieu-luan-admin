import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import * as receiptsApi from "../../api/receiptsApi";

function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getReceiptDetails = await receiptsApi.get(id);
      setDetails(getReceiptDetails.receipts[0].chitietphieunhaps);
    };
    fetchApi();
  }, [id]);

  return (
    <div className="detail">
      <h2>Chi tiết phiếu nhập</h2>
      <Row>
        <Col className="col-6">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {details?.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.sanpham.sp_ten}</td>
                  <td>{detail.ctpn_soluong}</td>
                  <td>
                    {parseInt(detail.ctpn_dongia).toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
