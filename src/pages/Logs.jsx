import { useState } from "react";

// Datos de ejemplo con info adicional del vehículo
const logsData = [
  { id: 1, plate: "ABC 123", datetime: "2026-02-26 14:32:15", camera: "Entrada Principal", type: "entrada", vehicle: { brand: "Toyota", model: "Corolla", color: "Blanco", owner: "Juan Pérez" }, todayEntries: 3, todayExits: 2, weekEntries: 12, weekExits: 11 },
  { id: 2, plate: "XYZ 789", datetime: "2026-02-26 14:28:42", camera: "Estacionamiento A", type: "entrada", vehicle: { brand: "Ford", model: "Focus", color: "Negro", owner: "María García" }, todayEntries: 1, todayExits: 0, weekEntries: 5, weekExits: 5 },
  { id: 3, plate: "DEF 456", datetime: "2026-02-26 14:25:08", camera: "Salida Norte", type: "salida", vehicle: { brand: "Chevrolet", model: "Cruze", color: "Gris", owner: "Carlos López" }, todayEntries: 2, todayExits: 2, weekEntries: 8, weekExits: 8 },
  { id: 4, plate: "GHI 321", datetime: "2026-02-26 14:20:33", camera: "Entrada Principal", type: "entrada", vehicle: { brand: "Volkswagen", model: "Golf", color: "Azul", owner: "Ana Martínez" }, todayEntries: 1, todayExits: 0, weekEntries: 3, weekExits: 2 },
  { id: 5, plate: "JKL 654", datetime: "2026-02-26 14:15:19", camera: "Estacionamiento B", type: "salida", vehicle: { brand: "Renault", model: "Sandero", color: "Rojo", owner: "Pedro Sánchez" }, todayEntries: 4, todayExits: 4, weekEntries: 15, weekExits: 15 },
];

// Iconos de ojo
function EyeClosedIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

// Modal de detalle
function DetailModal({ log, onClose }) {
  if (!log) return null;

  return (
    // 🎯 Modal con fade-in para overlay y contenido
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal - 🎯 Scale-in suave con shadow dramática */}
      <div className="relative bg-lpr-800 rounded-2xl border border-lpr-700 shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lpr-700">
          <div className="flex items-center gap-3">
            {/* 🎯 Badge de patente con hover */}
            <span className="px-4 py-2 bg-lpr-700 rounded-lg font-mono font-bold text-xl text-accent-cyan transition-all duration-200 hover:bg-accent-cyan/20 hover:scale-105">
              {log.plate}
            </span>
          </div>
          {/* 🎯 Botón cerrar con microescalado */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-lpr-700 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-90 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Vehicle Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Información del Vehículo</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* 🎯 Cards con hover sutil */}
              <div className="bg-lpr-700/50 rounded-lg p-3 transition-all duration-200 hover:bg-lpr-700/70 hover:scale-[1.02]">
                <p className="text-xs text-gray-500">Marca</p>
                <p className="font-medium">{log.vehicle.brand}</p>
              </div>
              <div className="bg-lpr-700/50 rounded-lg p-3 transition-all duration-200 hover:bg-lpr-700/70 hover:scale-[1.02]">
                <p className="text-xs text-gray-500">Modelo</p>
                <p className="font-medium">{log.vehicle.model}</p>
              </div>
              <div className="bg-lpr-700/50 rounded-lg p-3 transition-all duration-200 hover:bg-lpr-700/70 hover:scale-[1.02]">
                <p className="text-xs text-gray-500">Color</p>
                <p className="font-medium">{log.vehicle.color}</p>
              </div>
           
            </div>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Estadísticas de Acceso</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Today - 🎯 Card con hover */}
              <div className="bg-lpr-700/50 rounded-lg p-4 transition-all duration-200 hover:bg-lpr-700/70">
                <p className="text-xs text-gray-500 mb-2">Hoy</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-green">{log.todayEntries}</p>
                    <p className="text-xs text-gray-400">Entradas</p>
                  </div>
                  <div className="h-8 w-px bg-lpr-600" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{log.todayExits}</p>
                    <p className="text-xs text-gray-400">Salidas</p>
                  </div>
                </div>
              </div>

              {/* Week - 🎯 Card con hover */}
              <div className="bg-lpr-700/50 rounded-lg p-4 transition-all duration-200 hover:bg-lpr-700/70">
                <p className="text-xs text-gray-500 mb-2">Esta Semana</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-green">{log.weekEntries}</p>
                    <p className="text-xs text-gray-400">Entradas</p>
                  </div>
                  <div className="h-8 w-px bg-lpr-600" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{log.weekExits}</p>
                    <p className="text-xs text-gray-400">Salidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Detection - 🎯 Card con hover y borde animado */}
          <div className="bg-lpr-700/30 rounded-lg p-4 border border-lpr-600 transition-all duration-300 hover:border-accent-cyan/50 hover:bg-lpr-700/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Última Detección</p>
                <p className="font-medium">{log.datetime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Cámara</p>
                <p className="font-medium">{log.camera}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  log.type === "entrada"
                    ? "bg-accent-green/20 text-accent-green"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {log.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Logs() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    // 🎯 Fade-in para toda la página
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2">Registros</h2>
        <p className="text-gray-400">Historial de patentes detectadas por el sistema.</p>
      </div>

      {/* 🎯 Tabla con animación de entrada y borde hover */}
      <div className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl border border-lpr-700 overflow-hidden hover:border-lpr-600 transition-colors duration-300" style={{ animationDelay: '100ms' }}>
        <table className="w-full">
          <thead className="bg-lpr-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Patente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha / Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cámara</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lpr-700">
            {logsData.map((log) => (
              // 🎯 Fila con hover suave + ligero translate
              <tr key={log.id} className="hover:bg-lpr-800/40 transition-all duration-200 hover:shadow-md">
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* 🎯 Badge de patente con hover */}
                  <span className="px-3 py-1 bg-lpr-700 rounded-lg font-mono font-bold text-accent-cyan transition-all duration-200 hover:bg-accent-cyan/20 hover:scale-105 inline-block">
                    {log.plate}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 transition-colors duration-200">{log.datetime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 transition-colors duration-200">{log.camera}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* 🎯 Badge de tipo con transición */}
                  <span
                    className={`px-2 py-1 text-xs rounded-full transition-all duration-200 hover:scale-110 inline-block ${
                      log.type === "entrada"
                        ? "bg-accent-green/20 text-accent-green"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {log.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* 🎯 Botón con ícono que cambia suavemente + microescalado */}
                  <button
                    onClick={() => setSelectedLog(log)}
                    onMouseEnter={() => setHoveredId(log.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="p-2 hover:bg-lpr-600 rounded-lg transition-all duration-200 text-gray-400 hover:text-accent-cyan hover:scale-110 active:scale-95"
                    title="Ver detalle"
                  >
                    <div className="transition-transform duration-200">
                      {hoveredId === log.id ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedLog && (
        <DetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  );
}
