import { useCallback } from 'react';
import { getDetections, getVehicles } from '../api/services/lprService';
import { usePolling } from '../hooks/usePolling';

function StatCard({ label, value, color, delay, loading }) {
  return (
    <div
      className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-5 border border-surface-lighter hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-glow-primary transition-all duration-300 ease-out"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      {loading ? (
        <div className="h-8 w-20 bg-surface-lighter animate-pulse rounded" />
      ) : (
        <p className={`text-2xl font-bold text-${color}`}>{value}</p>
      )}
    </div>
  );
}

function formatTimeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)   return `Hace ${diff}s`;
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)}min`;
  return `Hace ${Math.floor(diff / 3600)}h`;
}

export default function Dashboard() {
  const fetchDetections = useCallback(() => getDetections({ limit: 10 }), []);
  const fetchVehicles   = useCallback(() => getVehicles({ status: 'inside' }), []);

  const { data: detections, loading: loadingD, error: errorD } = usePolling(fetchDetections, 5000, []);
  const { data: vehicles,   loading: loadingV }                 = usePolling(fetchVehicles,   5000, []);

  const today          = new Date().toISOString().slice(0, 10);
  const todayDets      = (detections ?? []).filter(d => d.detection_timestamp?.slice(0, 10) === today);
  const insideCount    = vehicles?.length ?? 0;
  const entriesCount   = todayDets.filter(d => d.event === 'entry').length;
  const exitsCount     = todayDets.filter(d => d.event === 'exit').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Dashboard</h2>
        <p className="text-text-secondary">Panel en tiempo real del sistema LPR.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Vehículos Adentro"       value={insideCount}          color="primary-light"   delay={0}   loading={loadingV} />
        <StatCard label="Entradas Hoy"             value={entriesCount}          color="status-success"  delay={100} loading={loadingD} />
        <StatCard label="Salidas Hoy"              value={exitsCount}            color="status-warning"  delay={200} loading={loadingD} />
        <StatCard label="Detecciones Recientes"    value={detections?.length ?? 0} color="accent-bright" delay={300} loading={loadingD} />
      </div>

      {/* Activity Feed */}
      <div
        className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-surface-lighter/80 transition-all duration-300"
        style={{ animationDelay: '400ms' }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-text-primary">
          Actividad Reciente
          <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
          <span className="ml-auto text-xs text-text-muted font-normal">Actualiza cada 5s</span>
        </h3>

        {errorD && (
          <p className="text-sm text-status-error text-center py-4">
            No se pudo conectar con LPR_node. Verificá que esté corriendo en el puerto 9000.
          </p>
        )}

        {loadingD && !errorD && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-surface-lighter/50 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {!loadingD && !errorD && (
          <div className="space-y-3">
            {detections?.length === 0 && (
              <p className="text-text-muted text-sm text-center py-4">Sin detecciones aún.</p>
            )}
            {detections?.map((det) => (
              <div
                key={det.id}
                className="flex items-center justify-between py-3 border-b border-surface-lighter last:border-0 transition-all duration-200 hover:bg-surface-lighter/30 hover:px-2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-surface-lighter rounded-lg font-mono font-bold text-primary-light hover:bg-primary/20 hover:scale-105 transition-all duration-200">
                    {det.plate}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      det.event === 'entry'
                        ? 'bg-status-success/20 text-status-success'
                        : 'bg-status-warning/20 text-status-warning'
                    }`}
                  >
                    {det.event === 'entry' ? 'Entrada' : 'Salida'}
                  </span>
                  <span className="text-text-secondary text-sm hidden md:block">
                    {(det.confidence * 100).toFixed(1)}% conf.
                  </span>
                </div>
                <span className="text-sm text-text-muted">
                  {formatTimeAgo(det.detection_timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehículos en playa */}
      {!loadingV && insideCount > 0 && (
        <div
          className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter transition-all duration-300"
          style={{ animationDelay: '500ms' }}
        >
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Vehículos en Playa</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {vehicles?.map(v => (
              <div
                key={v.id}
                className="flex flex-col items-center gap-1 px-3 py-2 bg-surface-lighter/50 rounded-lg border border-surface-lighter hover:border-status-success/50 transition-all duration-200"
              >
                <span className="font-mono font-bold text-primary-light text-sm">{v.plate}</span>
                <span className="text-xs text-text-muted">{v.total_entries} entrada{v.total_entries !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
