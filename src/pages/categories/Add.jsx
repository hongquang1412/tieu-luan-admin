import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as categoriesApi from "../../api/categoriesApi";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    l_ten: "",
    l_hinh: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append("l_ten", data.l_ten);
    formData.append("l_hinh", data.l_hinh);

    await categoriesApi.post(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Thêm loại thành công");
    navigate("/categories");
  };

  return (
    <div className="category">
      <h2>Thêm loại sản phẩm</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleCategory">Tên loại</Label>
              <Input
                id="exampleCategory"
                name="category"
                placeholder="Nhập tên loại"
                type="text"
                required
                onChange={(e) => {
                  setData({ ...data, l_ten: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleImg">Hình ảnh</Label>
              <Input
                id="exampleImg"
                name="img"
                type="file"
                required
                accept=".jpg, .png"
                onChange={(e) => {
                  setData({ ...data, l_hinh: e.target.files[0] });
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
