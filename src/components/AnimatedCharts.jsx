import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Filler, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Filler, Legend);

const barData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  datasets: [
    {
      label: "Ventas",
      data: [120, 190, 300, 250, 220, 320],
      backgroundColor: "#3b82f6",
      borderRadius: 8,
      maxBarThickness: 32,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  animation: { duration: 900, easing: "easeOutQuart" },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#64748b" } },
    y: { grid: { color: "#e5e7eb" }, ticks: { color: "#64748b" }, beginAtZero: true },
  },
};

const lineData = {
  labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  datasets: [
    {
      label: "Visitas",
      data: [30, 50, 40, 60, 80, 70, 90],
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.15)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#10b981",
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  animation: { duration: 1000, easing: "easeOutQuart" },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#64748b" } },
    y: { grid: { color: "#e5e7eb" }, ticks: { color: "#64748b" }, beginAtZero: true },
  },
};

export default function AnimatedCharts() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">Ventas por Mes</h3>
        <Bar data={barData} options={barOptions} height={220} />
      </div>
      <div>
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-white">Visitas por Día</h3>
        <Line data={lineData} options={lineOptions} height={220} />
      </div>
    </div>
  );
}
