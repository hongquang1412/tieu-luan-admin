import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Tháng 1",
    total: 2000,
  },
  {
    name: "Tháng 2",
    total: 7000,
  },
  {
    name: "Tháng 3",
    total: 5000,
  },
  {
    name: "Tháng 4",
    total: 1000,
  },
  {
    name: "Tháng 5",
    total: 6000,
  },
  {
    name: "Tháng 6",
    total: 9000,
  },
];
export default function Chart() {
  return (
    <div className="chart">
      <div className="chart-title mb-3 fs-4">6 tháng gần đây (doanh thu)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chart-grid"/>
          <XAxis dataKey="name" stroke="gray"/>
          <YAxis />
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
