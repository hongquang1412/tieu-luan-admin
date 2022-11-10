import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as customersApi from "../../api/customersApi";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const getCustomer = await customersApi.get(id);
      setCustomer(getCustomer.customers[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    if (customer) {
      setName(customer.kh_hoten);
      setEmail(customer.kh_email);
      setPhone(customer.kh_sdt);
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      kh_hoten: name,
      kh_email: email,
      kh_sdt: phone,
    };

    if (form.checkValidity()) {
      await customersApi.patch(id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật khách hàng thành công");
      navigate("/customers");
    }
  };

  return (
    <div className="category">
      <h2>Cập nhật khách hàng</h2>
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
                defaultValue={customer.kh_hoten}
                onChange={(e) => {
                  setName(e.target.value);
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
                defaultValue={customer.kh_email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                defaultValue={customer.kh_sdt}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FormGroup>
            <Button color="primary">Cập nhật</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Update;
