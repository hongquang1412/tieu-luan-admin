import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as capacitiesApi from "../../api/capacitiesApi";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [capacity, setCapacity] = useState([]);
  const [number, setNumber] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const getCapacity = await capacitiesApi.get(id);
      setCapacity(getCapacity.capacities[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    if(capacity){
      setNumber(capacity.dl_dungluong)
    }
  }, [capacity])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      dl_dungluong: number,
    };

    if (form.checkValidity()) {
      await capacitiesApi.patch(id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật dung lượng thành công");
      navigate("/capacities");
    }
  };
  return (
    <div className="color">
      <h2>Cập nhật dung lượng</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleUserName">Dung lượng</Label>
              <Input
                id="exampleUserName"
                name="userName"
                placeholder="Nhập dung lượng"
                type="text"
                required
                defaultValue={capacity.dl_dungluong}
                onChange={(e) => {
                  setNumber(e.target.value);
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
