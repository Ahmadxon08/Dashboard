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
  const purchasePrices = product.skuList.map((item) => item.purchasePrice || 0);

  // Add zeros to align with dates if necessary
  while (fullPrices.length < dates.length) fullPrices.push(0);
  while (purchasePrices.length < dates.length) purchasePrices.push(0);

  // Extract seller rating and reviews
  const sellerRating = product.rating || product.seller.rating;
  const reviewsAmount = product.seller.reviews || 0;

  // Prepare chart data
  const chartData = dates.map((date, index) => ({
    date,
    fullPrice: fullPrices[index],
    purchasePrice: purchasePrices[index],
    sellerRating: sellerRating,
    reviewsAmount: reviewsAmount,
  }));

  const option = {
    title: {
      text: "Product Prices, Rating, and Reviews",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [" Price", "Seller Rating", "Reviews Amount"],
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
        name: "Price",
      },
      {
        type: "value",
        name: "Rating/Reviews",
        position: "right",
      },
    ],
    series: [
      {
        name: " Price",
        type: "line",
        data: chartData.map((data) => data.fullPrice),
        smooth: true,
        color: "#82ca9d",
      },
      {
        name: "Seller Rating",
        type: "line",
        data: chartData.map(() => sellerRating), // Constant rating value
        smooth: true,
        color: "#ff7300",
      },
      {
        name: "Reviews Amount",
        type: "line",
        yAxisIndex: 1, // Use the second y-axis for reviews
        data: chartData.map(() => reviewsAmount), // Constant reviews amount
        smooth: true,
        color: "#ff0000",
      },
    ],
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default LineChartCostume;
