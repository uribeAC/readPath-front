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
  labels: string[];
  ariaLabel: string;
  secondDataset?: number[];
  secondLabel?: string;
}

const BookYearsChart: React.FC<BookYearsChartProps> = ({
  firstDataset,
  firstLabel,
  labels,
  ariaLabel,
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

  return <Bar options={options} data={data} aria-label={ariaLabel} />;
};

export default BookYearsChart;
