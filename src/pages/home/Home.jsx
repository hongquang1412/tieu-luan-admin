import React from "react";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import HomeTable from "../../components/table/HomeTable";
function Home() {
  return (
    <>
      <div className="widgets">
        <Widget type="Nhân viên"/>
        <Widget type="Khách hàng"/>
        <Widget type="Đơn hàng"/>
        <Widget type="Loại"/>
        <Widget type="Sản phẩm"/>
      </div>
      <div className="charts">
        <Featured/>
        <Chart/>
      </div>
      <div className="list-container">
        <div className="list-container-title">
          Giao dịch gần đây
        </div>
        <HomeTable/>
      </div>
    </>
  );
}

export default Home;
