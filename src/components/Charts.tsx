// components/TemperatureChart.tsx
"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureChartProps {
  temperature: number[];
  date: string[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ temperature, date }) => {
  const data = {
    labels: date,
    datasets: [
      {
        label: 'Temperatura',
        data: temperature,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Últimos Registros de Temperatura',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureChart;
