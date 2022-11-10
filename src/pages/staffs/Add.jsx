import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as staffsApi from "../../api/staffsApi";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nv_hoten: name,
      nv_matkhau: password,
      nv_gioitinh: gender,
      nv_email: email,
      nv_ngaysinh: birthDay,
      nv_diachi: address,
      nv_sdt: phone,
    };

    await staffsApi.post(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Thêm nhân viên thành công");
    navigate("/staffs");
  };
  return (
    <div className="staff">
      <h2>Thêm nhân viên</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label>Họ tên: </Label>
              <Input
                name="product"
                placeholder="Nhập họ tên"
                type="text"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Mật khẩu: </Label>
              <Input
                name="product"
                placeholder="Nhập mật khẩu"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup
              tag="fieldset"
              className="d-flex"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <Label className="me-3">Giới tính:</Label>
              <FormGroup className="me-3" check>
                <Input name="radio1" type="radio" value="0" />{" "}
                <Label check>Nam</Label>
              </FormGroup>
              <FormGroup className="me-3" check>
                <Input name="radio1" type="radio" value="1" />{" "}
                <Label check>Nữ</Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label>Email: </Label>
              <Input
                name="product"
                placeholder="Nhập email"
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Ngày sinh: </Label>
              <Input
                name="product"
                type="date"
                required
                onChange={(e) => {
                  setBirthDay(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Địa chỉ: </Label>
              <Input
                name="product"
                placeholder="Nhập địa chỉ"
                type="text"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label>Số điện thoại: </Label>
              <Input
                name="product"
                placeholder="Nhập số điện thoại"
                type="text"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" block>
              Thêm
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Add;
