/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";
import { useTranslation } from "react-i18next";

const LineChartCostume = ({ product }) => {
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

  // Extract price data
  const fullPrices = product.skuList.map((item) => item.purchasePrice || 0);

  // Add zeros to align with dates if necessary
  while (fullPrices.length < dates.length) fullPrices.push(0);

  // Prepare chart data
  const chartData = dates.map((date, index) => ({
    date,
    fullPrice: fullPrices[index],
  }));

  const option = {
    title: {
      text: t("chart.priceTitle"),
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [t("chart.price")], // legend ma'lumotlarini yangilash
      top: 20,
    },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.date),
    },
    yAxis: {
      type: "value",
      name: t("chart.price"),
      offset: -5,
    },
    series: [
      {
        name: t("chart.price"), // seriya nomini yangilash
        type: "line",
        data: chartData.map((data) => data.fullPrice),
        smooth: true,
        color: "#82ca9d",
      },
    ],
  };

  return (
    <div className="chart-container">
      <ReactECharts option={option} />
    </div>
  );
};

export default LineChartCostume;
