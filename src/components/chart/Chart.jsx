/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // TimeScale ni import qilish
} from "chart.js";
import { eachDayOfInterval, format } from "date-fns";
import "chartjs-adapter-date-fns"; // Date-fns adapterini import qilish

// Chart.js modullarini ro'yxatdan o'tkazish
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // TimeScale ni ro'yxatdan o'tkazish
);

const LineChart = ({ product }) => {
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

  const data = {
    labels: dates, // Sanalar ro'yxati
    datasets: [
      {
        label: "Full Price",
        data: fullPrices,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Purchase Price",
        data: purchasePrices,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time", // vaqt o'lchami uchun
        time: {
          unit: "day", // kunlik bo'lishi kerak
        },
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div style={{ width: "500px", height: "300px" }}>
      <h2
        style={{
          textAlign: "left",
          marginBottom: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}>
        Prices
      </h2>
      <Line
        data={data}
        options={options}
        // O'lchamlarni CSS orqali o'zgartirdik
      />
    </div>
  );
};

export default LineChart;
