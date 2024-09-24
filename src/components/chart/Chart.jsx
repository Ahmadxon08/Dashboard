/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";

const LineChartCostume = ({ product }) => {
  if (!product || !product.skuList) {
    return <p>No data available</p>;
  }

  // Prepare data for the chart
  const generateDates = (startDate, endDate) => {
    const days = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    return days.map((day) => format(day, "yyyy-MM-dd"));
  };

  const productTimestamp = product.timestamp || "2024-08-01";
  const currentTimestamp = new Date();

  // Get all dates between the product's timestamp and the current date
  const dates = generateDates(productTimestamp, currentTimestamp);

  // Extract price data
  const fullPrices = product.skuList.map((item) => item.fullPrice || 0);

  // Add zeros to align with dates if necessary
  while (fullPrices.length < dates.length) fullPrices.push(0);

  // Prepare chart data
  const chartData = dates.map((date, index) => ({
    date,
    fullPrice: fullPrices[index],
  }));

  const option = {
    title: {
      text: "Product Price Over Time",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Price"],
      top: 20,
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.date),
      name: "",
    },
    yAxis: {
      type: "value",
      name: "Price",
    },
    series: [
      {
        name: "Price",
        type: "line",
        data: chartData.map((data) => data.fullPrice),
        smooth: true,
        color: "#82ca9d",
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ width: "80%", maxHeight: "250px" }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default LineChartCostume;
