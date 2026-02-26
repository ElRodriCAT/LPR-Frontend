export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
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
            className="bg-lpr-800 rounded-xl p-5 border border-lpr-700 hover:border-lpr-600 transition-colors"
          >
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
        <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {[
            { plate: "ABC 123", time: "Hace 2 min", camera: "Entrada Principal" },
            { plate: "XYZ 789", time: "Hace 5 min", camera: "Estacionamiento A" },
            { plate: "DEF 456", time: "Hace 8 min", camera: "Salida Norte" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-lpr-700 last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-lpr-700 rounded-lg font-mono font-bold text-accent-cyan">
                  {item.plate}
                </span>
                <span className="text-gray-400">{item.camera}</span>
              </div>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
