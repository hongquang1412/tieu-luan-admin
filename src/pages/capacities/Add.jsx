import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as capacitiesApi from "../../api/capacitiesApi";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    dl_dungluong: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      await capacitiesApi.post(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm dung lượng thành công");
      navigate("/capacities");
    }
  };
  return (
    <div className="color">
      <h2>Thêm dung lượng</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleCategory">Dung lượng</Label>
              <Input
                id="exampleCategory"
                name="category"
                placeholder="Nhập dung lượng"
                type="text"
                required
                onChange={(e) => {
                  setData({ dl_dungluong: e.target.value });
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
