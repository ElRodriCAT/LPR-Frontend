import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getDetections, getVehicles } from '../api/services/lprService';
import { usePolling } from '../hooks/usePolling';
import { useSortableList } from '../hooks/useSortableList';

// ---- Drag handle ----
function DragHandle(props) {
  return (
    <div
      {...props}
      className="opacity-0 group-hover:opacity-50 hover:!opacity-100 cursor-grab active:cursor-grabbing text-text-muted p-1.5 rounded hover:bg-surface-lighter/80 transition-all duration-150 absolute top-2 right-2"
      title="Reordenar"
    >
      <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
        <circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/>
        <circle cx="2" cy="7" r="1.5"/><circle cx="8" cy="7" r="1.5"/>
        <circle cx="2" cy="12" r="1.5"/><circle cx="8" cy="12" r="1.5"/>
      </svg>
    </div>
  );
}

// ---- Definición de stat cards ----
const STAT_IDS = ['inside', 'entries', 'exits', 'recent'];

function getStatDef(id, { insideCount, entriesCount, exitsCount, recentCount, loadingD, loadingV }) {
  return {
    inside:  { label: 'Vehículos Adentro',    color: 'primary-light',  value: insideCount,  loading: loadingV },
    entries: { label: 'Entradas Hoy',          color: 'status-success', value: entriesCount, loading: loadingD },
    exits:   { label: 'Salidas Hoy',           color: 'status-warning', value: exitsCount,   loading: loadingD },
    recent:  { label: 'Detecciones Recientes', color: 'accent-bright',  value: recentCount,  loading: loadingD },
  }[id];
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

  const today        = new Date().toISOString().slice(0, 10);
  const todayDets    = (detections ?? []).filter(d => d.detection_timestamp?.slice(0, 10) === today);
  const insideCount  = vehicles?.length ?? 0;
  const entriesCount = todayDets.filter(d => d.event === 'entry').length;
  const exitsCount   = todayDets.filter(d => d.event === 'exit').length;
  const recentCount  = detections?.length ?? 0;
  const values       = { insideCount, entriesCount, exitsCount, recentCount, loadingD, loadingV };

  const { order: statOrder, onDragEnd: onStatDragEnd } = useSortableList('dashboard-stats', STAT_IDS);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Dashboard</h2>
        <p className="text-text-secondary">Panel en tiempo real del sistema LPR.</p>
      </div>

      {/* Stats Cards — arrastrables */}
      <DragDropContext onDragEnd={onStatDragEnd}>
        <Droppable droppableId="dashboard-stats" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4"
            >
              {statOrder.map((id, index) => {
                const stat = getStatDef(id, values);
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group relative flex-1 min-w-0 bg-surface-light/85 backdrop-blur-sm rounded-xl p-5 border transition-all duration-200 ease-out ${
                          snapshot.isDragging
                            ? 'border-primary/70 shadow-glow-primary scale-[1.04] rotate-1 z-50'
                            : 'border-surface-lighter hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-glow-primary'
                        }`}
                      >
                        <DragHandle {...provided.dragHandleProps} />
                        <p className="text-sm text-text-secondary mb-1 pr-6">{stat.label}</p>
                        {stat.loading ? (
                          <div className="h-8 w-20 bg-surface-lighter animate-pulse rounded" />
                        ) : (
                          <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
