import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Dashboard",
  "/cameras": "Cámaras",
  "/logs": "Registros",
  "/stats": "Estadísticas",
  "/settings": "Configuración",
  "/charts": "Charts",
};

export default function Topbar({ scrolled = false }) {
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
    // 🎯 Header con backdrop blur y animación de entrada - Mayor opacidad para legibilidad
    <header className={`h-16 border-b border-surface-lighter flex items-center justify-between px-6 animate-slideInDown transition-all duration-300 ${
      scrolled
        ? 'bg-surface-dark/80 backdrop-blur-md shadow-xl'
        : 'bg-surface-light/95 backdrop-blur-sm shadow-lg'
    }`}>
      {/* Page Title */}
      <div className="flex items-center gap-3">
        {/* 🎯 Título con fade-in */}
        <h1 className="text-xl font-semibold text-text-primary transition-colors duration-200">{pageTitle}</h1>
        {/* 🎯 Badge de versión con hover */}
        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary-light rounded-full transition-all duration-200 hover:bg-primary/30 hover:scale-110">
          v1.0
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Date & Time - 🎯 Animación suave al cambiar */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-text-muted transition-colors duration-200">{formatDate(currentTime)}</span>
          {/* 🎯 Reloj con fuente mono y color accent */}
          <span className="text-lg font-mono text-primary-light transition-all duration-300 tabular-nums">
            {formatTime(currentTime)}
          </span>
        </div>

        {/* Refresh Button - 🎯 Con rotación al click */}
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-surface-lighter rounded-lg transition-all duration-200 group hover:scale-110 active:scale-95"
          title="Recargar página"
        >
          <svg
            // 🎯 Rotación del ícono en hover + cambio de color
            className="w-5 h-5 text-text-secondary group-hover:text-status-success transition-all duration-300 group-hover:rotate-180"
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
        <div className="flex items-center gap-3 pl-4 border-l border-surface-lighter">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-text-primary transition-colors duration-200">{user.name}</span>
            <span className="text-xs text-text-secondary transition-colors duration-200">{user.role}</span>
          </div>
          {/* 🎯 Avatar con hover y transiciones */}
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent cursor-pointer">
            <span className="text-surface-dark font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
