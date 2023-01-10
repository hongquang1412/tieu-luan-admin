import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as capacitiesApi from "../../api/capacitiesApi";

function Capacities() {
  const [capacities, setCapacities] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const getCapacities = await capacitiesApi.get();
      setCapacities(getCapacities.capacities);
      setRender(false);
    };
    fetchApi();
  }, [render]);

  const handleDeleteCapacity = (id) => {
    const confirm = window.confirm("Bạn có muốn xóa không ?");
    if (confirm) {
      capacitiesApi._delete(id);
      window.alert("Xóa thành công");
      setRender(true);
    }
  };

  return (
    <div className="capacity">
      <div className="capacity-btn-add">
        <NavLink to="/capacities/add" className="d-flex justify-content-end text-decoration-none">
          <Button color="info" className="text-white">Thêm</Button>
        </NavLink>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th colSpan={3} className="text-center text-white bg-info">
              Danh sách dung lượng
            </th>
          </tr>
          <tr>
            <th>id</th>
            <th>Dung lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {capacities.map((capaticy, index) => (
            <tr key={index}>
              <td>{capaticy.dl_id}</td>
              <td>{capaticy.dl_dungluong}</td>
              <td className="text-center">
                <NavLink to={`/capacities/update/${capaticy.dl_id}`}>
                  <Button color="info" className="text-white">
                    Cập nhật
                  </Button>
                </NavLink>
                &nbsp; &nbsp;
                <Button
                  color="danger"
                  onClick={() => handleDeleteCapacity(capaticy.dl_id)}
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

export default Capacities;
