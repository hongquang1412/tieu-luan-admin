import React, { useState, useEffect } from "react";
import * as ordersApi from "../../api/ordersApi";

function Statistics() {
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const getOrderDetails = await ordersApi.getOrderDetailsByMonth();
      setOrderDetails(getOrderDetails.orderDetails);
    };
    fetchApi();
  }, []);

  let TotalRevenue = 0;
  orderDetails.map((detail) => {
    TotalRevenue += detail.ctdh_soluong * detail.ctdh_dongia;
  });
  console.log(orderDetails);
  let a = (TotalRevenue - 1000000) / 1000000
  console.log(Math.round(a));
  return <div>Statistics</div>;
}

export default Statistics;
