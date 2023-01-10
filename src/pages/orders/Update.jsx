import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as ordersApi from "../../api/ordersApi";
function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderStatus = ["Chưa duyệt", "Đã duyệt", "Đang giao", "Đã giao"];
  const [order, setOrder] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [statusSelected, setStatusSelected] = useState("");
  const [orderDate, setOrderDate] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const getOrder = await ordersApi.getDetails(id);
      setOrder(getOrder.orders[0]);
      setStatusSelected(getOrder.orders[0]?.dh_trangthai);
      setOrderDate(new Date(getOrder.orders[0].dh_ngaytao))
      setDeliveryTime(getOrder.orders[0]?.dh_thoigiangh);
    };
    fetchApi();
  }, [id]);

  let newStatus = [];
  let check = false;
  orderStatus.forEach((status) => {
    if (status === statusSelected) {
      check = true;
    }
    if (check) {
      newStatus.push(status);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const data = {
        dh_thoigiangh: deliveryTime,
        dh_trangthai: statusSelected,
      };
      await ordersApi.patch(id, data, {
        headers: { "Content-Type": " application/json" },
      });
      alert("Cập nhật đơn hàng thành công");
      navigate("/orders");
    }
  };
  return (
    <div className="order">
      <h3>Cập nhật đơn hàng</h3>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleDate">Ngày giao hàng</Label>
              <Input
                id="exampleDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                min={orderDate?.toISOString().slice(0, 10)}
                defaultValue={order.dh_thoigiangh}
                onChange={(e) => {
                  setDeliveryTime(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Trạng thái đơn hàng</Label>
              <br />
              <select
                id="exampleSelect"
                name="select"
                onChange={(e) => {
                  setStatusSelected(e.target.value);
                }}
              >
                <option defaultValue={statusSelected} selected>
                  {statusSelected}
                </option>
                {newStatus.map((status) =>
                  status !== statusSelected ? (
                    <option value={status}>{status}</option>
                  ) : (
                    <></>
                  )
                )}
              </select>
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

export default Update;
