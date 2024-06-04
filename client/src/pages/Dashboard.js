import React, { useEffect, useState } from "react";
import { Bar, Chart, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
  ArcElement
);

const Dashboard = () => {
    const dataChart = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  
    const dataBar = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 850); 
      };
  
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div className="dark:bg-gray-900 h-[calc(100vh-8rem)] overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 w-3/4 mx-auto mt-10`}>
          <div className="chart-container">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Chart 1</h2>
            <Chart type="line" data={dataChart} />
          </div>
          <div className="chart-container">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Chart 2</h2>
            <Bar data={dataBar} type="bar" />
          </div>
          <div className="chart-container">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Chart 3</h2>
            <Bar data={dataBar} type="bar" />
          </div>
          <div className="chart-container">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Chart 3</h2>
            <Bar data={dataBar} type="bar" />
          </div>
          <div className="chart-container">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Chart 3</h2>
            <Bar data={dataBar} type="bar" />
          </div>
        </div>
      </div>
    );
  };
  

export default Dashboard;
