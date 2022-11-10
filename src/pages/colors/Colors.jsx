import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as colorApi from "../../api/colorsApi";

function Colors() {
  const [colors, setColors] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getColors = await colorApi.get();
      setColors(getColors.colors);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteColor = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      colorApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <div className="color">
      <div className="color-btn-add">
        <NavLink to="/colors/add">
          <Button color="primary">Thêm màu sắc</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Màu sắc</th>
            <th>Mã màu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={index}>
              <td>{color.ms_id}</td>
              <td>{color.ms_mau}</td>
              <td>{color.ms_ma}</td>
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
        </tbody>
      </Table>
    </div>
  );
}

export default Colors;
