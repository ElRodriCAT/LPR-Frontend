export default function Dashboard() {
  return (
    // 🎯 Fade-in suave para toda la página (0.3s)
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-400">Bienvenido al panel del sistema LPR.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Patentes Hoy", value: "1,234", color: "accent-green" },
          { label: "Cámaras Activas", value: "8", color: "accent-cyan" },
          { label: "Alertas", value: "3", color: "yellow-500" },
          { label: "Tasa de Éxito", value: "98.5%", color: "accent-green" },
        ].map((stat, idx) => (
          <div
            key={idx}
            // 🎯 Animaciones clave:
            // - opacity-0 animate-fadeInUp: fade-in desde abajo con delay escalonado
            // - hover:-translate-y-1: elevación sutil al pasar mouse
            // - hover:shadow-xl: sombra aumentada
            // - hover:border-accent-cyan/50: borde con color
            // - transition-all duration-300: transición suave (ajusta a 200/500 si prefieres)
            className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl p-5 border border-lpr-700 hover:border-accent-cyan/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out"
            style={{ animationDelay: `${idx * 100}ms` }} // Delay escalonado
          >
            <p className="text-sm text-gray-400 mb-1 transition-colors duration-200">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color} transition-transform duration-200 hover:scale-105`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl p-6 border border-lpr-700 hover:border-lpr-600 transition-all duration-300" style={{ animationDelay: "400ms" }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Actividad Reciente
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
        </h3>
        <div className="space-y-3">
          {[
            { plate: "ABC 123", time: "Hace 2 min", camera: "Entrada Principal" },
            { plate: "XYZ 789", time: "Hace 5 min", camera: "Estacionamiento A" },
            { plate: "DEF 456", time: "Hace 8 min", camera: "Salida Norte" },
          ].map((item, idx) => (
            <div
              key={idx}
              // 🎯 Hover sutil en filas: fondo + ligero padding
              className="flex items-center justify-between py-3 border-b border-lpr-700 last:border-0 transition-all duration-200 hover:bg-lpr-700/30 hover:px-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-lpr-700 rounded-lg font-mono font-bold text-accent-cyan transition-all duration-200 hover:bg-accent-cyan/20 hover:scale-105">
                  {item.plate}
                </span>
                <span className="text-gray-400 transition-colors duration-200">{item.camera}</span>
              </div>
              <span className="text-sm text-gray-500 transition-colors duration-200">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
