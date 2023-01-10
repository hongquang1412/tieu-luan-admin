import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
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
        <NavLink to="/colors/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
        <tr>
            <th colSpan={4} className="text-center text-white bg-info">Danh sách màu sắc</th>
          </tr>
          <tr>
            <th>id</th>
            <th>Màu sắc</th>
            <th>Mã màu</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={index}>
              <td>{color.ms_id}</td>
              <td>{color.ms_mau}</td>
              <td>{color.ms_ma}</td>
              <td className="text-center">
                <NavLink
                  to={`/colors/update/${color.ms_id}`}
                >
                 <Button color="info" className="text-white">
                  Cập nhật
                 </Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button
                  color="danger"
                  onClick={() => handleDeleteColor(color.ms_id)}
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

export default Colors;
