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
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getProduct = await productsApi.get(id);
      setCapacities(getProduct.products[0].dungluongs);
      setPrices(getProduct.products[0].giatiens)
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
      setPrice(prices[parseInt(selected)]?.gt_gia);
  }, [prices, selected]);

  useEffect(() => {
    // setCapacityId(String(capacities[0]?.dl_id))
    setCapacityId(String(prices[0]?.dungluong?.dl_id))
  }, [prices])
  console.log(capacityId);

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
                 {prices.map((price, index) => (
                  <option key={index} value={price.dungluong?.dl_id}>
                    {price.dungluong?.dl_dungluong}
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
                defaultValue={prices[parseInt(selected)]?.gt_gia}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" block>
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Price;
