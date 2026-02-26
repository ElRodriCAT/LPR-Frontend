import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import InteractiveGradientAI from "../components/InteractiveGradientAI";

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-full text-text-primary flex overflow-hidden relative">
      {/* 🌌 Fondo interactivo con gradiente AI - Detrás de todo */}
      <InteractiveGradientAI />
      
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Topbar */}
        <Topbar />

        {/* Page Content - 🎯 Smooth scroll con animación */}
        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          {/* 🎯 Container con max-width y transiciones */}
          <div className="max-w-7xl mx-auto relative z-10">
            {/* 🎯 Outlet con fade-in en cada cambio de ruta */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
