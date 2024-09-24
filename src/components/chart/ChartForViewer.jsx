/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";

const ChartForViewer = ({ product }) => {
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

  // Extract seller rating and reviews
  const reviewsAmount = product.seller.reviews || 0;

  // Prepare chart data
  const chartData = dates.map((date) => ({
    date,
    reviewsAmount: reviewsAmount,
  }));

  const option = {
    title: {
      text: "Reviews Amount Over Time",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Reviews Amount"],
      top: 20,
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.date),
      name: "",
    },
    yAxis: {
      type: "value",
      name: "Reviews Amount",
    },
    series: [
      {
        name: "Reviews Amount",
        type: "line",
        data: chartData.map(() => reviewsAmount), // Constant reviews amount
        smooth: true,
        color: "#ff0000",
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

export default ChartForViewer;
