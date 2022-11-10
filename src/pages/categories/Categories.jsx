import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
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
        <NavLink to="/categories/add">
          <Button color="primary">Thêm loại</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Tên loại</th>
            <th>Hình ảnh</th>
            <th>Thao tác</th>
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
              <td>
                <NavLink
                  to={`/categories/update/${category.l_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteCategory(category.l_id)}
                >
                  <RiDeleteBin6Line className="fs-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
