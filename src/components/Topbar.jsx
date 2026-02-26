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
    <header className="h-16 bg-lpr-800/80 backdrop-blur-sm border-b border-lpr-700 flex items-center justify-between px-6 shadow-lg">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
        <span className="px-2 py-0.5 text-xs bg-accent-cyan/20 text-accent-cyan rounded-full">
          v1.0
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Date & Time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-gray-400">{formatDate(currentTime)}</span>
          <span className="text-lg font-mono text-accent-cyan">{formatTime(currentTime)}</span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-lpr-700 rounded-lg transition-colors group"
          title="Recargar página"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-accent-green transition-colors"
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

        {/* User Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-lpr-700">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-white">{user.name}</span>
            <span className="text-xs text-gray-400">{user.role}</span>
          </div>
          <div className="w-9 h-9 bg-gradient-to-br from-accent-green to-accent-cyan rounded-full flex items-center justify-center">
            <span className="text-lpr-900 font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
