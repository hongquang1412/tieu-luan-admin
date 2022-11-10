import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import * as customersApi from "../../api/customersApi";
function Detail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getCustomer = await customersApi.get(id);
      setCustomer(getCustomer.customers[0]);
    };
    fetchApi();
  }, [id]);

  return (
    <div className="detail">
      <h2>Chi tiết thông tin khách hàng</h2>
      <Row>
        <Col className="col-6">
          <ul>
            <li>
              <strong className="fs-4">Họ tên: </strong>
              <span className="fs-4">{customer.kh_hoten}</span>
            </li>
            <li>
              <strong className="fs-4">Email: </strong>
              <span className="fs-4">{customer.kh_email}</span>
            </li>
            <li>
              <strong className="fs-4">Số điện thoại: </strong>
              <span className="fs-4">{customer.kh_sdt}</span>
            </li>
            <li>
              <strong className="fs-4">Loại tài khoản: </strong>
              <span className="fs-4">{customer.kh_loai}</span>
            </li>
            <li>
            <strong className="fs-4">Địa chỉ: </strong>
              <ol className="fs-4">
                {customer.diachis?.map((add, index)=>(
                  <li>
                    <span>
                    {add.dc_diachi}
                    </span>
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Detail;
