export default function Dashboard() {
  return (
    // 🎯 Fade-in suave para toda la página (0.3s)
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Dashboard</h2>
        <p className="text-text-secondary">Bienvenido al panel del sistema LPR.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Patentes Hoy", value: "1,234", color: "primary-light" },
          { label: "Cámaras Activas", value: "8", color: "accent-bright" },
          { label: "Alertas", value: "3", color: "status-warning" },
          { label: "Tasa de Éxito", value: "98.5%", color: "status-success" },
        ].map((stat, idx) => (
          <div
            key={idx}
            // 🎯 Animaciones clave (Mayor opacidad para legibilidad y hover en toda la card)
            className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-5 border border-surface-lighter hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-glow-primary transition-all duration-300 ease-out"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <p className="text-sm text-text-secondary mb-1 transition-colors duration-200">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Feed con mayor opacidad */}
      <div className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-surface-lighter/80 transition-all duration-300" style={{ animationDelay: "400ms" }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-text-primary">
          Actividad Reciente
          <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
        </h3>
        <div className="space-y-3">
          {[
            { plate: "ABC 123", time: "Hace 2 min", camera: "Entrada Principal" },
            { plate: "XYZ 789", time: "Hace 5 min", camera: "Estacionamiento A" },
            { plate: "DEF 456", time: "Hace 8 min", camera: "Salida Norte" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-surface-lighter last:border-0 transition-all duration-200 hover:bg-surface-lighter/30 hover:px-2 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-surface-lighter rounded-lg font-mono font-bold text-primary-light transition-all duration-200 hover:bg-primary/20 hover:scale-105">
                  {item.plate}
                </span>
                <span className="text-text-secondary transition-colors duration-200">{item.camera}</span>
              </div>
              <span className="text-sm text-text-muted transition-colors duration-200">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
