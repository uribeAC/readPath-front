import type React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BookYearsChartProps {
  firstDataset: number[];
  firstLabel: string;
  secondDataset?: number[];
  secondLabel?: string;
  labels: string[];
}

const BookYearsChart: React.FC<BookYearsChartProps> = ({
  firstDataset,
  firstLabel,
  labels,
  secondDataset,
  secondLabel,
}) => {
  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: firstLabel,
        data: firstDataset,
        backgroundColor: "rgba(255, 159, 64, 0.8)",
      },
    ],
  };

  if (secondDataset && secondLabel) {
    data.datasets.push({
      label: secondLabel,
      data: secondDataset,
      backgroundColor: "rgba(255, 202, 40, 0.8)",
    });
  }

  return <Bar options={options} data={data} />;
};

export default BookYearsChart;
