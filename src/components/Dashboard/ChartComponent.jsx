import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 500, tickets: 120 },
  { month: "Feb", revenue: 700, tickets: 150 },
  { month: "Mar", revenue: 900, tickets: 180 },
];

const ChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
        <Bar dataKey="tickets" fill="#82ca9d" name="Số vé bán" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
