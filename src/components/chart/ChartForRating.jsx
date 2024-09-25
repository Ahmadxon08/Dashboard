/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";
import { useTranslation } from "react-i18next";

const ChartForRating = ({ product }) => {
  const { t } = useTranslation();
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

  // Orders amount - har bir kunga mos keladigan sotilgan mahsulotlar
  const ordersAmount = product.ordersAmount || [];

  // Prepare chart data
  const chartData = dates.map((date) => ({
    date,
    sellerRating,
    reviewsAmount,
    sold: ordersAmount || 0,
  }));

  const option = {
    title: {
      text: t("chart.ratingTitle"),
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [t("chart.rating"), t("table.sold")],
      top: 20,
      left: "center", // Markazda joylashtirish
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.date),
      name: "",
    },
    yAxis: [
      {
        type: "value",
        name: t("chart.rating"),
      },
      {
        type: "value",
        name: t("chart.sold"),
        offset: 60, // Ikkinchi y o'qi uchun offset qo'shiladi
      },
    ],
    series: [
      {
        name: t("chart.rating"),
        type: "line",
        data: chartData.map(() => sellerRating),
        smooth: true,
        color: "#ff7300",
        yAxisIndex: 0,
      },
      {
        name: t("table.sold"),
        type: "line",
        data: chartData.map((data) => data.sold),
        smooth: true,
        color: "#ffbb00",
        yAxisIndex: 0,
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ width: "90%", maxHeight: "250px" }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default ChartForRating;
