import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as categoriesApi from "../../api/categoriesApi";
import * as colorsApi from "../../api/colorsApi";
import * as capacitiesApi from "../../api/capacitiesApi";
import * as productsApi from "../../api/productsApi";
import { useNavigate } from "react-router-dom";
function Add() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [des, setDes] = useState("");
  const [categorySelected, setCategorySelected] = useState(1);
  const [capacitiesSelected, setCapacitiesSelected] = useState([]);
  const [colorsSelected, setColorsSelected] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getCategories = await categoriesApi.get();
      setCategories(getCategories.categories);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getColors = await colorsApi.get("", "1", "100");
      setColors(getColors.colors);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getCapacities = await capacitiesApi.get();
      setCapacities(getCapacities.capacities);
    };
    fetchApi();
  }, []);

  const formData = new FormData();
  formData.append("sp_ten", productName);
  formData.append("l_id", categorySelected);
  formData.append("sp_mota", des);
  formData.append("colors", JSON.stringify(colorsSelected));
  formData.append("capacities", JSON.stringify(capacitiesSelected));
  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.values(images).forEach((img) => {
      formData.append("h_ten", img);
    });

    await productsApi.post(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Thêm sản phẩm thành công");
    navigate("/products");
  };
console.log("color",colorsSelected);
  return (
    <div className="product">
      <h2>Thêm sản phẩm</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleProduct">Tên sản phẩm</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập tên sản phẩm"
                type="text"
                required
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleImg">Hình ảnh</Label>
              <Input
                id="exampleImg"
                name="h_ten"
                type="file"
                multiple
                required
                accept="image/*"
                onChange={(e) => {
                  setImages(e.target.files);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Mô tả</Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                rows="6"
                required
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Loại</Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => {
                  setCategorySelected(e.target.value);
                }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.l_id}>
                    {category.l_ten}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <p>Màu sắc</p>
            {colors.map((color, index) => (
              <FormGroup check inline key={index}>
                <Input
                  id={color.ms_mau}
                  type="checkbox"
                  value={color.ms_id}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setColorsSelected([...colorsSelected, e.target.value]);
                    } else {
                      const newSelected = colorsSelected.filter((_) => {
                        return _ !== e.target.value;
                      });
                      setColorsSelected(newSelected);
                    }
                  }}
                />
                <Label check for={color.ms_mau}>
                  {color.ms_mau}
                </Label>
              </FormGroup>
            ))}

            <p>Dung lượng</p>
            {capacities.map((capacity, index) => (
              <FormGroup check inline key={index}>
                <Input
                  id={capacity.dl_id}
                  type="checkbox"
                  value={capacity.dl_id}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setCapacitiesSelected([
                        ...capacitiesSelected,
                        e.target.value,
                      ]);
                    } else {
                      const newSelected = capacitiesSelected.filter((_) => {
                        return _ !== e.target.value;
                      });
                      setCapacitiesSelected(newSelected);
                    }
                  }}
                />
                <Label check for={capacity.dl_id}>
                  {`${capacity.dl_dungluong}`}
                </Label>
              </FormGroup>
            ))}

            <Button color="primary" block>
              Thêm
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Add;
