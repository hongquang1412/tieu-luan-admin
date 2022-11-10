import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as discountApi from "../../api/discountsApi";
import { useNavigate, useParams } from "react-router-dom";

function Discount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState([]);
  const [percent, setPercent] = useState(0);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const getDiscount = await discountApi.get(id);
      setDiscount(getDiscount.discounts[0]);
      setPercent(getDiscount.discounts[0]?.g_phantram);
      setStartDay(getDiscount.discounts[0]?.g_ngaybd);
      setEndDay(getDiscount.discounts[0]?.g_ngaykt);
    };
    fetchApi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      g_phantram: percent,
      g_ngaybd: startDay,
      g_ngaykt: endDay,
    };

    if (form.checkValidity()) {
      await discountApi.patch(id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Cập nhật giảm giá thành công");
      navigate("/products")
    }
  };

  return (
    <div className="discount">
      <h2>Cập nhật giảm giá</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleProduct">Phần trăm giảm giá</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập phần trăm giảm giá"
                type="text"
                defaultValue={percent}
                required
                onChange={(e) => {
                  setPercent(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Ngày bắt đầu</Label>
              <Input
                id="exampleProduct"
                name="product"
                type="date"
                required
                defaultValue={startDay}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => {
                  setStartDay(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Ngày kết thúc</Label>
              <Input
                id="exampleProduct"
                name="product"
                type="date"
                required
                onChange={(e) => {
                  setEndDay(e.target.value);
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

export default Discount;
