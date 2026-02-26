import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Cámara",
    path: "/camera",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Registros",
    path: "/logs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Estadísticas",
    path: "/stats",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Configuración",
    path: "/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const [systemOnline] = useState(true);

  return (
    <aside
      // 🎯 Transición suave del ancho (500ms con easing personalizado)
      // Mayor opacidad para mejor legibilidad con backdrop-blur
      className={`${
        collapsed ? "w-16" : "w-64"
      } h-screen bg-surface-light/95 backdrop-blur-md border-r border-surface-lighter flex flex-col transition-all duration-500 ease-out shadow-xl relative z-20`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-lighter">
        {!collapsed && (
          <span className="font-semibold text-lg transition-colors duration-200 animate-slideInRight">
            LPR System
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          // 🎯 Microinteracción: scale ligero + rotación + color
          className="p-2 hover:bg-surface-lighter rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          <svg
            // 🎯 Rotación suave del ícono (aumentada a 500ms para sincronizar con sidebar)
            className={`w-5 h-5 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              // 🎯 Transiciones mejoradas:
              // - duration-300: transición estándar para cambios de estado
              // - hover:scale-[1.02]: microescalado sutil
              // - hover:shadow-md: sombra al hover
              // - border-l-2: indicador visual del item activo con animación
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary/20 text-primary-light border-l-2 border-primary shadow-md shadow-primary/10"
                  : "text-text-secondary hover:bg-surface-lighter hover:text-text-primary hover:scale-[1.02] hover:shadow-md"
              } ${collapsed ? "justify-center" : ""}`
            }
            title={collapsed ? item.name : undefined}
          >
            {/* 🎯 Ícono con transición de color y escala */}
            <span className="transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            {/* 🎯 Texto con fade cuando sidebar se expande */}
            {!collapsed && (
              <span className="font-medium transition-all duration-300 animate-slideInRight">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-surface-lighter">
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""} transition-all duration-300`}>
          <div
            // 🎯 Pulso suave para indicador de estado online
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              systemOnline ? "bg-status-success animate-pulse shadow-lg shadow-status-success/50" : "bg-status-error animate-pulse shadow-lg shadow-status-error/50"
            }`}
          />
          {!collapsed && (
            <span className={`text-sm transition-colors duration-300 animate-slideInRight ${systemOnline ? "text-status-success" : "text-status-error"}`}>
              {systemOnline ? "Sistema Online" : "Sistema Offline"}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
