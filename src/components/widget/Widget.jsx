import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as staffsApi from "../../api/staffsApi";
import * as customersApi from "../../api/customersApi";
import * as ordersApi from "../../api/ordersApi";
import * as categoriesApi from "../../api/categoriesApi";
import * as productsApi from "../../api/productsApi";
function Widget({ type }) {
  const [countStaffs, setCountStaffs] = useState(0);
  const [countCustomers, setCountCustomers] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [countCategories, setCountCategories] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const getCount = await staffsApi.get();
      setCountStaffs(getCount.rows_count)
    }
    fetchApi();
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      const getCount = await customersApi.get();
      setCountCustomers(getCount.rows_count)
    }
    fetchApi();
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      const getCount = await ordersApi.get();
      setCountOrders(getCount.rows_count)
    }
    fetchApi();
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      const getCount = await categoriesApi.get();
      setCountCategories(getCount.rows_count)
    }
    fetchApi();
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      const getCount = await productsApi.get();
      setCountProducts(getCount.rows_count)
    }
    fetchApi();
  }, [])

  let data;
  switch (type) {
    case "Nhân viên":
      data = {
        title: "NHÂN VIÊN",
        color: "text-primary",
        count: countStaffs,
        url: "/staffs",
        link: "Xem tất cả nhân viên",
      };
      break;
    case "Loại":
      data = {
        title: "LOẠI",
        color: "text-success",
        count: countCategories,
        url: "/categories",
        link: "Xem tất cả loại",
      };
      break;
    case "Sản phẩm":
      data = {
        title: "SẢN PHẨM",
        color: "text-danger",
        count: countProducts,
        url: "/products",
        link: "Xem tất cả sản phẩm",
      };
      break;
    case "Khách hàng":
      data = {
        title: "KHÁCH HÀNG",
        color: "text-warning",
        count: countCustomers,
        url: "/customers",
        link: "Xem tất cả khách hàng",
      };
      break;
    case "Đơn hàng":
      data = {
        title: "ĐƠN HÀNG",
        color: "text-info",
        count: countOrders,
        url: "/orders",
        link: "Xem tất cả đơn hàng",
      };
      break;
    default: {
    }
  }
  return (
    <div className="widget">
      <div className="widget-left">
        <span className={`widget-left-title ${data.color}`}>{data.title}</span>
        <span className="widget-left-counter">{data.count}</span>
        <NavLink to={data.url} className="widget-left-link">
          {data.link}
        </NavLink>
      </div>
    </div>
  );
}

export default Widget;
