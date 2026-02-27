import { useState, useCallback, useEffect } from "react";
import { getDetections, getVehicle } from "../api/services/lprService";
import { usePolling } from "../hooks/usePolling";

// ---------- Iconos ----------
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

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function formatDuration(seconds) {
  if (!seconds) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// ---------- Modal ----------
function DetailModal({ detection, onClose }) {
  const [vehicle, setVehicle]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    getVehicle(detection.plate)
      .then(v  => { setVehicle(v); setError(null); })
      .catch(() => setError('No se pudo cargar el vehículo.'))
      .finally(() => setLoading(false));
  }, [detection.plate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-light/98 backdrop-blur-md rounded-2xl border border-surface-lighter shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-lighter">
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-surface-lighter rounded-lg font-mono font-bold text-xl text-primary-light">
              {detection.plate}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              detection.event === 'entry'
                ? 'bg-status-success/20 text-status-success'
                : 'bg-status-warning/20 text-status-warning'
            }`}>
              {detection.event === 'entry' ? 'Entrada' : 'Salida'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-lighter rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-90 active:scale-95 text-text-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Detección actual */}
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-3">Detección</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-lighter/50 rounded-lg p-3">
                <p className="text-xs text-text-muted">Fecha / Hora</p>
                <p className="font-medium text-text-primary text-sm">{formatDate(detection.detection_timestamp)}</p>
              </div>
              <div className="bg-surface-lighter/50 rounded-lg p-3">
                <p className="text-xs text-text-muted">Confianza</p>
                <p className="font-medium text-text-primary">{(detection.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Info del vehículo */}
          {loading && (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-surface-lighter/50 rounded-lg animate-pulse" />
              ))}
            </div>
          )}
          {error && <p className="text-sm text-status-error">{error}</p>}
          {!loading && vehicle && (
            <>
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-3">Historial del Vehículo</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-lighter/50 rounded-lg p-3">
                    <p className="text-xs text-text-muted">Estado actual</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${
                      vehicle.status === 'inside'
                        ? 'bg-status-success/20 text-status-success'
                        : 'bg-surface-lighter text-text-secondary'
                    }`}>
                      {vehicle.status === 'inside' ? 'Adentro' : 'Afuera'}
                    </span>
                  </div>
                  <div className="bg-surface-lighter/50 rounded-lg p-3">
                    <p className="text-xs text-text-muted">Última duración</p>
                    <p className="font-medium text-text-primary">{formatDuration(vehicle.last_duration)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-3">Estadísticas de Acceso</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-lighter/50 rounded-lg p-4">
                    <p className="text-xs text-text-muted mb-2">Total</p>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-status-success">{vehicle.total_entries}</p>
                        <p className="text-xs text-text-secondary">Entradas</p>
                      </div>
                      <div className="h-8 w-px bg-surface-lighter" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-status-warning">{vehicle.total_exits}</p>
                        <p className="text-xs text-text-secondary">Salidas</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-lighter/50 rounded-lg p-4">
                    <p className="text-xs text-text-muted mb-2">Fechas clave</p>
                    <div className="space-y-1">
                      <p className="text-xs text-text-secondary">
                        <span className="text-text-muted">1ra entrada: </span>
                        {vehicle.first_entry ? new Date(vehicle.first_entry).toLocaleDateString('es-AR') : '—'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        <span className="text-text-muted">Última salida: </span>
                        {vehicle.last_exit ? new Date(vehicle.last_exit).toLocaleDateString('es-AR') : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Filtros ----------
const EVENT_OPTIONS = [
  { value: '',      label: 'Todos' },
  { value: 'entry', label: 'Entradas' },
  { value: 'exit',  label: 'Salidas' },
];

// ---------- Página principal ----------
export default function Logs() {
  const [selectedDet, setSelectedDet] = useState(null);
  const [hoveredId,   setHoveredId]   = useState(null);
  const [plateFilter, setPlateFilter] = useState('');
  const [eventFilter, setEventFilter] = useState('');

  const fetchLogs = useCallback(() =>
    getDetections({
      limit:  100,
      plate:  plateFilter  || undefined,
      event:  eventFilter  || undefined,
    }),
    [plateFilter, eventFilter]
  );

  const { data: detections, loading, error, refresh } = usePolling(fetchLogs, 5000, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Registros</h2>
        <p className="text-text-secondary">Historial de patentes detectadas por el sistema.</p>
      </div>

      {/* Filtros */}
      <div
        className="opacity-0 animate-fadeInUp flex flex-wrap gap-3 items-center"
        style={{ animationDelay: '50ms' }}
      >
        <input
          type="text"
          placeholder="Buscar patente..."
          value={plateFilter}
          onChange={e => setPlateFilter(e.target.value)}
          className="px-4 py-2 bg-surface-light/85 border border-surface-lighter rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors duration-200 font-mono"
        />
        <div className="flex gap-2">
          {EVENT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setEventFilter(opt.value)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                eventFilter === opt.value
                  ? 'bg-primary/20 text-primary-light border border-primary/40'
                  : 'bg-surface-light/85 text-text-secondary border border-surface-lighter hover:border-primary/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-text-muted">Actualiza cada 5s</span>
      </div>

      {/* Tabla */}
      <div
        className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl border border-surface-lighter overflow-hidden hover:border-primary/50 transition-colors duration-300"
        style={{ animationDelay: '100ms' }}
      >
        {error && (
          <p className="text-sm text-status-error text-center py-8">
            No se pudo conectar con LPR_node. Verificá que esté corriendo en el puerto 9000.
          </p>
        )}

        {loading && !error && (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-surface-lighter/50 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {!loading && !error && (
          <table className="w-full">
            <thead className="bg-surface-lighter">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Patente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Fecha / Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Confianza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-lighter">
              {detections?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-muted text-sm">
                    Sin resultados.
                  </td>
                </tr>
              )}
              {detections?.map((det) => (
                <tr key={det.id} className="hover:bg-surface-lighter/30 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-surface-lighter rounded-lg font-mono font-bold text-primary-light hover:bg-primary/20 hover:scale-105 transition-all duration-200 inline-block">
                      {det.plate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(det.detection_timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {(det.confidence * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full inline-block ${
                      det.event === 'entry'
                        ? 'bg-status-success/20 text-status-success'
                        : 'bg-status-warning/20 text-status-warning'
                    }`}>
                      {det.event === 'entry' ? 'Entrada' : 'Salida'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setSelectedDet(det)}
                      onMouseEnter={() => setHoveredId(det.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="p-2 hover:bg-surface-lighter rounded-lg transition-all duration-200 text-text-muted hover:text-accent-bright hover:scale-110 active:scale-95"
                      title="Ver detalle"
                    >
                      {hoveredId === det.id ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedDet && (
        <DetailModal detection={selectedDet} onClose={() => setSelectedDet(null)} />
      )}
    </div>
  );
}
