import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as colorsApi from "../../api/colorsApi";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [color, setColors] = useState([]);
  const [nameColor, setNameColor] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const getColor = await colorsApi.get(id);
      setColors(getColor.colors[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    if(color){
      setNameColor(color.ms_mau);
      setCode(color.ms_ma)
    }
  }, [color]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      ms_mau: nameColor,
      ms_ma: code,
    };

    if (form.checkValidity()) {
      await colorsApi.patch(id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật màu sắc thành công");
      navigate("/colors");
    }
  };
  return (
    <div className="color">
      <h2>Cập nhật màu sắc</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleUserName">Màu sắc</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập màu sắc"
                type="text"
                required
                defaultValue={color.ms_mau}
                onChange={(e) => {
                  setNameColor(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleUserName">Mã màu</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập mã màu"
                type="text"
                required
                defaultValue={color.ms_ma}
                onChange={(e) => {
                  setCode(e.target.value);
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
