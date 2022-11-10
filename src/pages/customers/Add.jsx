import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as customersApi from "../../api/customersApi";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    kh_hoten: "",
    kh_email: "",
    kh_matkhau: "",
    kh_sdt: "",
  });

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      await customersApi.post(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm khách hàng thành công");
      navigate("/customers");
    }
  };

  return (
    <div className="customer">
      <h2>Thêm khách hàng</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleUserName">Họ tên</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập họ tên"
                type="text"
                required
                onChange={(e) => {
                  setData({ ...data, kh_hoten: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Nhập email"
                type="email"
                required
                onChange={(e) => {
                  setData({ ...data, kh_email: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Mật khẩu</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Nhập mật khẩu"
                type="password"
                required
                onChange={(e) => {
                  setData({ ...data, kh_matkhau: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePhone">Số điện thoại</Label>
              <Input
                id="examplePhone"
                name="phone"
                placeholder="Nhập số điện thoại"
                type="text"
                required
                maxLength={11}
                onChange={(e) => {
                  setData({ ...data, kh_sdt: e.target.value });
                }}
              />
            </FormGroup>
            <Button color="primary">Thêm</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Add;
