import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as colorsApi from "../../api/colorsApi";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    ms_mau: "",
    ms_ma: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      await colorsApi.post(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm màu sắc thành công");
      navigate("/colors");
    }
  };
  return (
    <div className="color">
      <h2>Thêm màu sắc</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleCategory">Màu sắc</Label>
              <Input
                id="exampleCategory"
                name="category"
                placeholder="Nhập màu sắc"
                type="text"
                required
                onChange={(e) => {
                  setData({ ...data, ms_mau: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleCategory">Mã màu</Label>
              <Input
                id="exampleCategory"
                name="category"
                placeholder="Nhập mã màu"
                type="text"
                required
                onChange={(e) => {
                  setData({ ...data, ms_ma: e.target.value });
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
