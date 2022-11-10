import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as discountsApi from "../../api/discountsApi";

function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getDiscounts = await discountsApi.get();
      setDiscounts(getDiscounts.discounts);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteDiscount = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      discountsApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <div className="discount">
      <div className="discount-btn-add">
        <NavLink to="/discounts/add">
          <Button color="primary">Thêm giảm giá</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Phần trăm</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        {/* <tbody>
          {colors.map((color, index) => (
            <tr key={index}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <NavLink
                  to={`/colors/update/${color.ms_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteColor(color.ms_id)}
                >
                  <RiDeleteBin6Line className="fs-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </Table>
    </div>
  );
}

export default Discounts;
