import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as categoriesApi from "../../api/categoriesApi";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    l_ten: "",
    l_hinh: "",
  });

  useEffect(() => {
    const fetchApi = async () => {
      const getCategory = await categoriesApi.get(id);
      setCategory(getCategory.categories[0]);
    };
    fetchApi();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    if (data.l_ten !== "") {
      formData.append("l_ten", data.l_ten);
    } else {
      formData.append("l_ten", category.l_ten);
    }
    if (data.l_hinh !== "") {
      formData.append("l_hinh", data.l_hinh);
    }

    if (form.checkValidity()) {
      await categoriesApi.patch(id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật loại thành công");
      navigate("/categories");
    }
  };

  return (
    <div className="category">
      <h2>Cập nhật loại sản phẩm</h2>
      <Row>
        <Col className="col-6">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="exampleCategory">Tên loại</Label>
              <Input
                id="exampleCategory"
                name="category"
                placeholder="Nhập tên loại"
                type="text"
                required
                defaultValue={category.l_ten}
                onChange={(e) => {
                  setData({ ...data, l_ten: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleImg">Hình ảnh</Label>
              <Input
                id="exampleImg"
                name="img"
                type="file"
                accept=".jpg, .png"
                required
                onChange={(e) => {
                  setData({ ...data, l_hinh: e.target.files[0] });
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
