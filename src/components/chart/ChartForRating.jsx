/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";

const ChartForRating = ({ product }) => {
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
  const sellerRating = product.rating || product.seller.rating;
  const reviewsAmount = product.seller.reviews || 0;

  // Prepare chart data
  const chartData = dates.map((date) => ({
    date,
    sellerRating: sellerRating,
    reviewsAmount: reviewsAmount,
  }));

  const option = {
    title: {
      text: "Seller Rating Over Time",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Seller Rating"],
      top: 20,
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.date),
      name: "",
    },
    yAxis: [
      {
        type: "value",
        name: "Seller Rating",
      },
    ],
    series: [
      {
        name: "Seller Rating",
        type: "line",
        data: chartData.map(() => sellerRating), // Constant rating value
        smooth: true,
        color: "#ff7300",
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

export default ChartForRating;
