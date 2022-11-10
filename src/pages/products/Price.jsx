import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as productsApi from "../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";

function Price() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selected, setSelected] = useState(0);
  const [price, setPrice] = useState("");
  const [capacityId, setCapacityId] = useState("");
  const [capacities, setCapacities] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getCapacities = await productsApi.get(id);
      setCapacities(getCapacities.products[0].dungluongs);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
      setPrice(capacities[parseInt(selected)]?.giatien.gt_gia);
  }, [capacities, selected]);

  useEffect(() => {
    setCapacityId(String(capacities[0]?.dl_id))
  }, [capacities])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      gt_gia: price,
    };
    if (form.checkValidity()) {
      await productsApi.patchPrice(id, capacityId, data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Cập nhật giá thành công");
      navigate("/products")
    }
  };
  return (
    <div className="product">
      <h2>Cập nhật giá tiền</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleSelect">Dung lượng</Label>
              <select
                id="exampleSelect"
                name="select"
                onChange={(e) => {
                  setSelected(e.target.selectedIndex);
                  setCapacityId(e.target.value);
                }}
              >
                {capacities.map((capacity, index) => (
                  <option key={index} value={capacity.dl_id}>
                    {capacity.dl_dungluong}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Giá</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập giá sản phẩm"
                type="text"
                defaultValue={capacities[parseInt(selected)]?.giatien.gt_gia}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" block>
              cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Price;
