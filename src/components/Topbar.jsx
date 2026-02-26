import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Dashboard",
  "/cameras": "Cámaras",
  "/logs": "Registros",
  "/stats": "Estadísticas",
  "/settings": "Configuración",
};

export default function Topbar() {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user] = useState({ name: "Admin", role: "Operador" });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const pageTitle = pageTitles[location.pathname] || "LPR System";

  return (
    // 🎯 Header con backdrop blur y animación de entrada
    <header className="h-16 bg-lpr-800/80 backdrop-blur-sm border-b border-lpr-700 flex items-center justify-between px-6 shadow-lg animate-slideInDown">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        {/* 🎯 Título con fade-in */}
        <h1 className="text-xl font-semibold text-white transition-colors duration-200">{pageTitle}</h1>
        {/* 🎯 Badge de versión con hover */}
        <span className="px-2 py-0.5 text-xs bg-accent-cyan/20 text-accent-cyan rounded-full transition-all duration-200 hover:bg-accent-cyan/30 hover:scale-110">
          v1.0
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Date & Time - 🎯 Animación suave al cambiar */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-gray-400 transition-colors duration-200">{formatDate(currentTime)}</span>
          {/* 🎯 Reloj con fuente mono y color accent */}
          <span className="text-lg font-mono text-accent-cyan transition-all duration-300 tabular-nums">
            {formatTime(currentTime)}
          </span>
        </div>

        {/* Refresh Button - 🎯 Con rotación al click */}
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-lpr-700 rounded-lg transition-all duration-200 group hover:scale-110 active:scale-95"
          title="Recargar página"
        >
          <svg
            // 🎯 Rotación del ícono en hover + cambio de color
            className="w-5 h-5 text-gray-400 group-hover:text-accent-green transition-all duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* User Info - 🎯 Con hover en avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-lpr-700">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-white transition-colors duration-200">{user.name}</span>
            <span className="text-xs text-gray-400 transition-colors duration-200">{user.role}</span>
          </div>
          {/* 🎯 Avatar con hover y transiciones */}
          <div className="w-9 h-9 bg-gradient-to-br from-accent-green to-accent-cyan rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent-cyan/30 cursor-pointer">
            <span className="text-lpr-900 font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
