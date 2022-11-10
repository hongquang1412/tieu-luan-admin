import React, { useState, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as ordersApi from "../../api/ordersApi";
function Featured() {
  const d = new Date();
  const today = d.getDay() - 1;
  const month = d.getMonth() + 1;
  const [todayOrderDetails, setTodayOrderDetails] = useState([]);
  const [thisMonthOrderDetails, setThisMonthOrderDetails] = useState([]);
  const [lastMonthOrderDetails, setLastMonthOrderDetails] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getOrderDetails = await ordersApi.getOrderDetailsByDay(today);
      setTodayOrderDetails(getOrderDetails.orderDetails);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getOrderDetails = await ordersApi.getOrderDetailsByMonth(month);
      setThisMonthOrderDetails(getOrderDetails.orderDetails);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const getOrderDetails = await ordersApi.getOrderDetailsByMonth(month - 1);
      setLastMonthOrderDetails(getOrderDetails.orderDetails);
    };
    fetchApi();
  }, []);
  console.log(lastMonthOrderDetails);

  let todayTotalRevenue = 0;
  todayOrderDetails.map((detail) => {
    todayTotalRevenue += detail.ctdh_soluong * detail.ctdh_dongia;
  });

  let totalRevenue = 0;
  thisMonthOrderDetails.map((detail) => {
    totalRevenue += detail.ctdh_soluong * detail.ctdh_dongia;
  });

  let lastMonthTotalRevenue = 0;
  lastMonthOrderDetails.map((detail) => {
    lastMonthTotalRevenue += detail.ctdh_soluong * detail.ctdh_dongia;
  });

  console.log("totalRevenue: ", totalRevenue);
  console.log("lastMonthTotalRevenue: ", lastMonthTotalRevenue);

  const percent =
    lastMonthTotalRevenue !== 0
      ? (totalRevenue - lastMonthTotalRevenue) / lastMonthTotalRevenue
      : 100;
  const profit = totalRevenue - lastMonthTotalRevenue;

  return (
    <div className="featured">
      <div className="featured-top">
        <h1 className="featured-top-title">{`Tổng doanh thu tháng ${month}`}</h1>
        <IoMdMore />
      </div>

      <div className="featured-bottom">
        <div className="featured-bottom-chart">
          <CircularProgressbar
            value={percent ? Math.round(percent) : "Đang cập nhật"}
            text={percent ? `${Math.round(percent)}%` : "0%"}
            strokeWidth={5}
          />
        </div>
        <p className="featured-bottom-title">Doanh thu của ngày hôm nay</p>
        <p className="featured-bottom-price">
          {todayTotalRevenue.toLocaleString("VND", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
      {/* <h5 className="mt-3 ms-2">Tổng tiền:</h5>
      <p className="fs-4 ms-2">
        {totalRevenue.toLocaleString("VND", {
          style: "currency",
          currency: "VND",
        })}
      </p> */}
    </div>
  );
}

export default Featured;
