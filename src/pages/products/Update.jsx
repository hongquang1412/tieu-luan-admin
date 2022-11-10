import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as categoriesApi from "../../api/categoriesApi";
import * as colorsApi from "../../api/colorsApi";
import * as capacitiesApi from "../../api/capacitiesApi";
import * as productsApi from "../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productStatus = ["Còn hàng", "Hết hàng"];
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [productName, setProductName] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [des, setDes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sold, setSold] = useState("");
  const [statusSelected, setStatusSelected] = useState("Còn hàng");
  const [categorySelected, setCategorySelected] = useState(1);
  const [capacitiesSelected, setCapacitiesSelected] = useState([]);
  const [colorsSelected, setColorsSelected] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getProduct = await productsApi.get(id);
      setProduct(getProduct.products[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchApi = async () => {
      const getCategories = await categoriesApi.get();
      setCategories(getCategories.categories);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getColors = await colorsApi.get();
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

  useEffect(() => {
    if (product) {
      setProductName(product.sp_ten);
      setCategorySelected(product.loai);
      setDes(product.sp_mota);
      setStatusSelected(product.sp_trangthai);
      setQuantity(product.kho?.k_soluong);
      setSold(product.kho?.k_daban);
      setColorsSelected(product.mausacs);
      setCapacitiesSelected(product.dungluongs);
    }
  }, [product]);

  // let files = [];
  // if (images) {
  //   images?.map((image) => {
  //     files = [...files, image];
  //     return files;
  //   });
  // }
  // console.log("hình ne", images);
  // console.log("up hình", files);

  let newStatus = [];
  let check = false;
  productStatus.forEach((status) => {
    if (status === statusSelected) {
      check = true;
    }
    if (check) {
      newStatus.push(status);
    }
  });

  let newCategories = categories.filter((category) => {
    return category.l_id !== categorySelected?.l_id;
  });

  let newColors = [];
  colorsSelected?.map((color) => {
    return (newColors = [...newColors, String(color.ms_id)]);
  });

  var newCapacities = [];
  capacitiesSelected?.map((capacity) => {
    return (newCapacities = [...newCapacities, String(capacity.dl_id)]);
  });

  console.log(newColors);
  console.log(newCapacities);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append("sp_ten", productName);
    formData.append("l_id", categorySelected?.l_id);
    formData.append("sp_mota", des);
    formData.append("sp_trangthai", statusSelected);
    formData.append("k_soluong", quantity);
    formData.append("k_daban", sold);
    formData.append("colors", JSON.stringify(newColors));
    formData.append("capacities", JSON.stringify(newCapacities));
    if (newImages.length !== 0) {
      Object.values(newImages).forEach((image) => {
        formData.append("h_ten", image);
      });
    }

    if (form.checkValidity()) {
      await productsApi.patch(id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cập nhật sản phẩm thành công");
      navigate("/products");
    }
  };
  return (
    <div className="product">
      <h2>Cập nhật sản phẩm</h2>
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
                defaultValue={productName}
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
                accept="image/*"
                onChange={(e) => {
                  setNewImages(e.target.files);
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
                defaultValue={des}
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Số lượng</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập số lượng"
                type="number"
                min={0}
                required
                defaultValue={quantity}
                onBlur={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleProduct">Đã bán</Label>
              <Input
                id="exampleProduct"
                name="product"
                placeholder="Nhập số lượng sản phẩm đã bán"
                type="number"
                min={0}
                required
                defaultValue={sold}
                onBlur={(e) => {
                  setSold(e.target.value);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Trạng thái</Label>
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
                <option value={categorySelected?.l_id}>
                  {categorySelected?.l_ten}
                </option>
                {newCategories.map((category, index) => (
                  <option key={index} value={category.l_id}>
                    {category.l_ten}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <p>Màu sắc</p>
            {colors?.map((color, index) =>
              newColors.includes(String(color.ms_id)) ? (
                <FormGroup check inline key={index}>
                  <Input
                    type="checkbox"
                    value={color.ms_id}
                    defaultChecked={true}
                    onChange={(e) => {
                      if (e.target.checked) {
                        newColors = [...newColors, e.target.value];
                      } else {
                        const newSelected = newColors.filter((_) => {
                          return _ !== e.target.value;
                        });
                        newColors = newSelected;
                      }
                    }}
                  />
                  <Label check>{color.ms_mau}</Label>
                </FormGroup>
              ) : (
                <FormGroup check inline key={index}>
                  <Input
                    type="checkbox"
                    value={color.ms_id}
                    defaultChecked={false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        newColors = [...newColors, e.target.value];
                      } else {
                        const newSelected = newColors.filter((_) => {
                          return _ !== e.target.value;
                        });
                        newColors = newSelected;
                      }
                    }}
                  />
                  <Label check>{color.ms_mau}</Label>
                </FormGroup>
              )
            )}
            <p>Dung lượng</p>
            {capacities.map((capacity, index) =>
              newCapacities.includes(String(capacity.dl_id)) ? (
                <FormGroup check inline key={index}>
                  <Input
                    type="checkbox"
                    defaultChecked={true}
                    value={capacity.dl_id}
                    onClick={(e) => {
                      if (e.target.checked) {
                        newCapacities = [...newCapacities, e.target.value];
                      } else {
                        const newSelected = newCapacities.filter((_) => {
                          return _ !== e.target.value;
                        });
                        newCapacities = newSelected;
                      }
                    }}
                  />
                  <Label check>{capacity.dl_dungluong}</Label>
                </FormGroup>
              ) : (
                <FormGroup check inline key={index}>
                  <Input
                    type="checkbox"
                    defaultChecked={false}
                    value={capacity.dl_id}
                    onClick={(e) => {
                      if (e.target.checked) {
                        newCapacities = [...newCapacities, e.target.value];
                      } else {
                        const newSelected = newCapacities.filter((_) => {
                          return _ !== e.target.value;
                        });
                        newCapacities = newSelected;
                      }
                    }}
                  />
                  <Label check>{capacity.dl_dungluong}</Label>
                </FormGroup>
              )
            )}

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
