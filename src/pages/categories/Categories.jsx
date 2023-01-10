import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import * as categoriesApi from "../../api/categoriesApi";
function Categories() {
  const [categories, setCategories] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getCategories = await categoriesApi.get();
      setCategories(getCategories.categories);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  console.log(categories);

  const handleDeleteCategory = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      categoriesApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <div className="category">
      <div className="category-btn-add">
        <NavLink to="/categories/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
        <tr>
            <th colSpan={4} className="text-center text-white bg-info">Danh sách loại sản phẩm</th>
          </tr>
          <tr>
            <th>id</th>
            <th>Tên loại</th>
            <th>Hình ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.l_id}</td>
              <td>{category.l_ten}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8887/${category.l_hinh}`}
                  alt=""
                  width="100"
                  height="100"
                />
              </td>
              <td className="text-center">
                <NavLink
                  to={`/categories/update/${category.l_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <Button color="info" className="text-white">
                    Cập nhật
                  </Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button
                  color="danger"
                  onClick={() => handleDeleteCategory(category.l_id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
