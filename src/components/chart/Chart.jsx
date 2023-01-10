import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as statisticalApi from "../../api/statisticalApi";

export default function Chart() {
  const [statistical, setStatistical] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const getStatistical = await statisticalApi.get();
      setStatistical(getStatistical.statistical);
    }
    fetchApi();
  }, []);


  return (
    <div className="chart">
      <div className="chart-title mb-3 fs-4">6 tháng gần đây (doanh thu)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={500}
          height={400}
          data={statistical}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
          <XAxis dataKey="month" stroke="gray" />
          <YAxis/>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
