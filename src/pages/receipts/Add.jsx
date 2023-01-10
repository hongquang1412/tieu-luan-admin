import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import * as productsApi from "../../api/productsApi";
import * as receiptsApi from "../../api/receiptsApi";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("infoStaff"));
  const nv_id = account.nv_id;
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await productsApi.get("", "1", "100");
      setProducts(getProducts.products);
      setId(String(getProducts.products[0].sp_id));
      setName(getProducts.products[0].sp_ten);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    setReceipts(JSON.parse(localStorage.getItem("receipts")));
    setRender(false);
  }, [render]);

  let total = 0;
  receipts?.map((receipt) => {
    total += receipt.quantity * receipt.price;
    return total;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let receipts = [];

    const getReceipts = localStorage.getItem("receipts");
    if (getReceipts) {
      receipts = JSON.parse(getReceipts);
    }

    const item = receipts.find((receipt) => {
      return receipt.name == name;
    });

    if (item) {
      item.quantity = parseInt(item.quantity) + parseInt(quantity);
    } else {
      receipts = [
        ...receipts,
        {
          id,
          name,
          quantity,
          price,
        },
      ];
    }

    localStorage.setItem("receipts", JSON.stringify(receipts));
    setReceipts(receipts);
    setQuantity("");
    setPrice("");
  };

  const handleDeleteReceipt = (id) => {
    console.log("pn: ", id);
    const confirm = window.confirm("Bạn có muốn xóa không!");
    if (confirm) {
      let receipts = [];
      const getReceipts = localStorage.getItem("receipts");
      if (getReceipts) {
        receipts = JSON.parse(getReceipts);
      }

      const newReceipts = receipts.filter((receipt, index) => {
        return index !== id;
      });

      console.log(newReceipts);

      localStorage.removeItem("receipts");
      localStorage.setItem("receipts", JSON.stringify(newReceipts));
      setRender(true);
    }
  };

  const handleConfirm = async (e) => {
    let detailReceipts = [];
    receipts?.map((receipt) => {
      detailReceipts = [
        ...detailReceipts,
        {
          sp_id: receipt.id,
          ctpn_soluong: receipt.quantity,
          ctpn_dongia: receipt.price,
        },
      ];
      return detailReceipts;
    });

    const data = {
      nv_id,
      pn_thanhtien: total,
      detailReceipts: JSON.stringify(detailReceipts),
    };

    await receiptsApi.post(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("receipts");
    setReceipts([]);
    setRender(true);
  };

  return (
    <div className="receipt">
      <h2 className="mb-3">Tạo phiếu nhập hàng</h2>
      <Row>
        <Col className="col-4">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Label for="cars">Chọn sản phẩm: </Label>
            <br />
            <select
              className="mb-3"
              name=""
              id=""
              onChange={(e) => {
                setId(e.target.value);
                setName(e.target.options[e.target.selectedIndex].text);
              }}
            >
              {products.map((product, index) => (
                <option key={index} value={product.sp_id}>
                  {product.sp_ten}
                </option>
              ))}
            </select>

            <FormGroup>
              <Label for="exampleProduct">Số lượng</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập số lượng"
                type="number"
                value={quantity}
                required
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Đơn giá</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập đơn giá"
                type="text"
                value={price}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormGroup>

            <Button color="primary" block>
              Thêm
            </Button>
          </Form>
        </Col>

        <Col className="col-2"></Col>

        <Col className="col-6">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {receipts?.map((receipt, index) => (
                <tr key={index}>
                  <td>{receipt.name}</td>
                  <td>{receipt.quantity}</td>
                  <td>
                    {parseInt(receipt.price).toLocaleString("VND", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="text-center">
                    <Button
                      color="danger"
                      onClick={() => {
                        handleDeleteReceipt(index);
                      }}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  Thành tiền:{" "}
                  {total.toLocaleString("VND", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            color="primary"
            onClick={(e) => {
              handleConfirm(e);
            }}
          >
            Xác nhận
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Add;
