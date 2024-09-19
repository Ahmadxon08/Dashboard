/* eslint-disable react/prop-types */
import ReactECharts from "echarts-for-react";
import { eachDayOfInterval, format } from "date-fns";
import "./Chart.scss";

const LineChartCostume = ({ product }) => {
  if (!product || !product.skuList || product.skuList.length === 0) {
    return <p>No data available</p>;
  }

  // Ma'lumotlarni tayyorlash
  const generateDates = (startDate, endDate) => {
    const days = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    return days.map((day) => format(day, "yyyy-MM-dd"));
  };

  const productTimestamp = product.timestamp || "2024-08-01";
  const currentTimestamp = new Date();

  // Barcha kunlar orasidagi sanalarni olish
  const dates = generateDates(productTimestamp, currentTimestamp);

  // SKU List'dagi narxlarni yig'ish
  const fullPrices = product.skuList.map((item) => item.fullPrice || 0);
  const purchasePrices = product.skuList.map((item) => item.purchasePrice || 0);

  // Agar sanalar va narxlar soni mos kelmasa, ularni moslashtirish
  if (fullPrices.length < dates.length) {
    const difference = dates.length - fullPrices.length;
    for (let i = 0; i < difference; i++) {
      fullPrices.push(0);
      purchasePrices.push(0);
    }
  }

  // ECharts uchun ma'lumotlar tayyorlash
  const chartData = dates.map((date, index) => ({
    date,
    fullPrice: fullPrices[index],
    purchasePrice: purchasePrices[index],
  }));

  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Full Price"],
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
        name: "Full Price",
        type: "line",
        data: chartData.map((data) => data.fullPrice),
        smooth: true,
        color: "#82ca9d",
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
