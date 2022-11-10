import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
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
        <NavLink to="/capacities/add">
          <Button color="primary">Thêm dung lượng</Button>
        </NavLink>
      </div>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Dung lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {capacities.map((capaticy, index) => (
            <tr key={index}>
              <td>{capaticy.dl_id}</td>
              <td>{capaticy.dl_dungluong}</td>
              <td>
                <NavLink
                  to={`/capacities/update/${capaticy.dl_id}`}
                  className="border-0 bg-transparent text-black"
                >
                  <BiEdit className="fs-4" />
                </NavLink>
                &nbsp; &nbsp;
                <button
                  className="border-0 bg-transparent"
                  onClick={() => handleDeleteCapacity(capaticy.dl_id)}
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

export default Capacities;
