export default function Cameras() {
  const cameras = [
    { id: 1, name: "Entrada Principal", status: "online", ip: "192.168.1.101" },
    { id: 2, name: "Estacionamiento A", status: "online", ip: "192.168.1.102" },
    { id: 3, name: "Estacionamiento B", status: "offline", ip: "192.168.1.103" },
    { id: 4, name: "Salida Norte", status: "online", ip: "192.168.1.104" },
  ];

  return (
    // 🎯 Fade-in para toda la página
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Cámaras</h2>
        <p className="text-text-secondary">Gestión y monitoreo de cámaras del sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera, idx) => (
          <div
            key={camera.id}
            // 🎯 Card con animación de entrada escalonada, hover y mayor opacidad
            className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl border border-surface-lighter overflow-hidden hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* 🎯 Área de video con hover */}
            <div className="aspect-video bg-surface-lighter flex items-center justify-center transition-all duration-300 hover:bg-surface-lighter/80">
              <svg className="w-16 h-16 text-text-muted transition-all duration-300 group-hover:text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold transition-colors duration-200 text-text-primary">{camera.name}</h3>
                {/* 🎯 Indicador de estado con pulso */}
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    camera.status === "online" 
                      ? "bg-status-success animate-pulse shadow-lg shadow-status-success/50" 
                      : "bg-status-error shadow-lg shadow-status-error/50"
                  }`}
                />
              </div>
              <p className="text-sm text-text-secondary font-mono transition-colors duration-200">{camera.ip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
