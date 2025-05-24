import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BookPieProps {
  labels: string[];
  labelTitle: string;
  dataNumbers: number[];
  ariaLabel: string;
}

const BookDoughnut: React.FC<BookPieProps> = ({
  dataNumbers,
  labelTitle,
  labels,
  ariaLabel,
}) => {
  const slicedData = dataNumbers.slice(0, 10);
  const slicedLabels = labels.slice(0, 10);

  const data = {
    labels: slicedLabels,
    datasets: [
      {
        label: labelTitle,
        data: slicedData,
        backgroundColor: [
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 111, 64, 0.8)",
          "rgba(255, 189, 89, 0.8)",
          "rgba(255, 140, 40, 0.8)",
          "rgba(255, 99, 71, 0.8)",
          "rgba(230, 126, 34, 0.8)",
          "rgba(245, 171, 53, 0.8)",
          "rgba(255, 204, 92, 0.8)",
          "rgba(255, 118, 85, 0.8)",
          "rgba(255, 186, 120, 0.8)",
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(255, 111, 64, 1)",
          "rgba(255, 189, 89, 1)",
          "rgba(255, 140, 40, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(230, 126, 34, 1)",
          "rgba(245, 171, 53, 1)",
          "rgba(255, 204, 92, 1)",
          "rgba(255, 118, 85, 1)",
          "rgba(255, 186, 120, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} aria-label={ariaLabel} />;
};

export default BookDoughnut;
