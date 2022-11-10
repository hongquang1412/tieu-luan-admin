import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { BiEdit, BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImPriceTag } from "react-icons/im";
import { TbDiscount2 } from "react-icons/tb";
import * as productsApi from "../../api/productsApi";
function Products() {
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getProducts = await productsApi.get();
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
        <NavLink to="/products/add">
          <Button color="primary">Thêm sản phẩm</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th className="text-center">Chi tiết</th>
            <th className="text-center">Giá tiền</th>
            <th className="text-center">Giảm giá</th>
            <th>Thao tác</th>
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
              <td>{product.kho?.k_soluong}</td>
              <td className="text-center">
                <NavLink
                  to={`/products/detail/${product.sp_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiDetail className="fs-3" />
                </NavLink>
              </td>
              <td className="text-center">
                <NavLink
                  to={`/products/price/${product.sp_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <ImPriceTag className="fs-3" />
                </NavLink>
              </td>
              <td className="text-center">
                <NavLink
                  to={`/products/discount/${product.sp_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <TbDiscount2 className="fs-3" />
                </NavLink>
              </td>
              <td>
                <NavLink
                  to={`/products/update/${product.sp_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-3" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteProduct(product.sp_id)}
                >
                  <RiDeleteBin6Line className="fs-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Products;
