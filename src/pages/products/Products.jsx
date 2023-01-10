import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import * as productsApi from "../../api/productsApi";
function Products() {
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await productsApi.get("", "1", "100");
      setProducts(getProducts.products);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      await productsApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <div className="product">
      <div className="product-btn-add">
        <NavLink to="/products/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th colSpan={6} className="text-center text-white bg-info">Danh sách sản phẩm</th>
          </tr>
          <tr>
            <th>id</th>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.sp_id}</td>
              <td>{product.sp_ten}</td>
              <td>{product.loai.l_ten}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8887/${product.hinhs[0]?.h_ten}`}
                  alt=""
                  width={100}
                  height={100}
                />
              </td>
              <td>{product.sp_soluong}</td>
              <td className="text-center">
                <NavLink to={`/products/detail/${product.sp_id}`}>
                  <Button>Chi tiết</Button>
                </NavLink>
                &nbsp; &nbsp;
                <NavLink to={`/products/price/${product.sp_id}`}>
                  <Button color="success">Giá tiền</Button>
                </NavLink>
                &nbsp; &nbsp;
                <NavLink to={`/products/discount/${product.sp_id}`}>
                  <Button color="warning" className="text-white">Giảm giá</Button>
                </NavLink>
                &nbsp; &nbsp;
                <NavLink to={`/products/update/${product.sp_id}`}>
                  <Button color="info" className="text-white">Cập nhật</Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button color="danger" onClick={() => handleDeleteProduct(product.sp_id)}>
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

export default Products;
