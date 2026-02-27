import { useState, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSortableList } from '../hooks/useSortableList';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement,
  ArcElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { getDetections } from '../api/services/lprService';
import { usePolling } from '../hooks/usePolling';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement,
  ArcElement,
  Title, Tooltip, Legend, Filler,
);

// ---------- Tema de colores compartido ----------
const C = {
  primary:  'rgba(99,179,237,0.85)',
  success:  'rgba(72,187,120,0.85)',
  warning:  'rgba(246,173,85,0.85)',
  error:    'rgba(245,101,101,0.85)',
  grid:     'rgba(255,255,255,0.06)',
  text:     'rgba(255,255,255,0.55)',
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: C.text, font: { size: 12 } } },
    tooltip: { backgroundColor: 'rgba(15,23,42,0.95)', borderColor: C.grid, borderWidth: 1 },
  },
  scales: {
    x: { ticks: { color: C.text }, grid: { color: C.grid } },
    y: { ticks: { color: C.text }, grid: { color: C.grid } },
  },
};

const noScalesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right', labels: { color: C.text, font: { size: 12 }, padding: 16 } },
    tooltip: { backgroundColor: 'rgba(15,23,42,0.95)' },
  },
};

// ---------- Helpers ----------
function groupByHour(detections) {
  const counts = Array(24).fill(0);
  detections.forEach(d => {
    const h = new Date(d.detection_timestamp).getHours();
    counts[h]++;
  });
  return counts;
}

function groupByDay(detections, days) {
  const now   = Date.now();
  const map   = {};
  const labels = [];

  for (let i = days - 1; i >= 0; i--) {
    const d   = new Date(now - i * 864e5);
    const key = d.toISOString().slice(0, 10);
    labels.push(d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }));
    map[key]  = { entry: 0, exit: 0 };
  }

  detections.forEach(d => {
    const key = d.detection_timestamp?.slice(0, 10);
    if (map[key]) {
      if (d.event === 'entry') map[key].entry++;
      else                     map[key].exit++;
    }
  });

  const entries = Object.values(map).map(v => v.entry);
  const exits   = Object.values(map).map(v => v.exit);
  return { labels, entries, exits };
}

// ---------- Componente de carga ----------
function ChartLoading() {
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-2 h-8 bg-surface-lighter rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    </div>
  );
}

function ChartError() {
  return (
    <div className="h-64 flex items-center justify-center">
      <p className="text-sm text-status-error">No se pudo conectar con LPR_node.</p>
    </div>
  );
}

function NoData() {
  return (
    <div className="h-64 flex items-center justify-center">
      <p className="text-sm text-text-muted">Sin datos aún.</p>
    </div>
  );
}

// ---- Drag handle ----
function DragHandle(props) {
  return (
    <div
      {...props}
      className="opacity-0 group-hover:opacity-50 hover:!opacity-100 cursor-grab active:cursor-grabbing text-text-muted p-1.5 rounded hover:bg-surface-lighter/80 transition-all duration-150 absolute top-3 right-3"
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

// ---- Definición de KPI cards ----
const KPI_IDS = ['total', 'entries', 'exits', 'avgConf'];

function getKpiDef(id, { totalDets, entries, exits, avgConf, loading }) {
  return {
    total:   { label: 'Total detectadas', color: 'primary-light',  value: totalDets,                          loading },
    entries: { label: 'Entradas',          color: 'status-success', value: entries,                            loading },
    exits:   { label: 'Salidas',           color: 'status-warning', value: exits,                              loading },
    avgConf: { label: 'Confianza prom.',   color: 'accent-bright',  value: avgConf === '—' ? '—' : `${avgConf}%`, loading },
  }[id];
}

// ---- Definición de chart sections ----
const CHART_IDS = ['hourBar', 'doughnut', 'line'];

const CHART_META = {
  hourBar:  { span: 1 },
  doughnut: { span: 1 },
  line:     { span: 2 },
};

// ---------- Página ----------
const RANGES = [7, 30, 90];

export default function Stats() {
  const [rangeDays, setRangeDays] = useState(7);

  const fetchStats = useCallback(() => getDetections({ limit: 500 }), []);
  const { data: detections, loading, error } = usePolling(fetchStats, 30000, []);

  const hourData = useMemo(() => {
    if (!detections?.length) return null;
    const counts = groupByHour(detections);
    return {
      labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
      datasets: [{
        label: 'Detecciones',
        data: counts,
        backgroundColor: C.primary,
        borderRadius: 4,
      }],
    };
  }, [detections]);

  const doughnutData = useMemo(() => {
    if (!detections?.length) return null;
    const entries = detections.filter(d => d.event === 'entry').length;
    const exits   = detections.filter(d => d.event === 'exit').length;
    return {
      labels: ['Entradas', 'Salidas'],
      datasets: [{
        data: [entries, exits],
        backgroundColor: [C.success, C.warning],
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 2,
      }],
    };
  }, [detections]);

  const lineData = useMemo(() => {
    if (!detections?.length) return null;
    const { labels, entries, exits } = groupByDay(detections, rangeDays);
    return {
      labels,
      datasets: [
        {
          label: 'Entradas',
          data: entries,
          borderColor: C.success,
          backgroundColor: 'rgba(72,187,120,0.12)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
        },
        {
          label: 'Salidas',
          data: exits,
          borderColor: C.warning,
          backgroundColor: 'rgba(246,173,85,0.12)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
        },
      ],
    };
  }, [detections, rangeDays]);

  // KPIs rápidos
  const totalDets  = detections?.length ?? 0;
  const entries    = detections?.filter(d => d.event === 'entry').length ?? 0;
  const exits      = detections?.filter(d => d.event === 'exit').length ?? 0;
  const avgConf    = detections?.length
    ? ((detections.reduce((s, d) => s + (d.confidence ?? 0), 0) / detections.length) * 100).toFixed(1)
    : '—';
  const kpiValues  = { totalDets, entries, exits, avgConf, loading };

  const { order: kpiOrder,   onDragEnd: onKpiDragEnd   } = useSortableList('stats-kpis',   KPI_IDS);
  const { order: chartOrder, onDragEnd: onChartDragEnd } = useSortableList('stats-charts', CHART_IDS);

  function renderChart(id) {
    if (id === 'hourBar') return (
      <>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-text-primary pr-8">
          Detecciones por Hora
          <span className="text-xs px-2 py-0.5 bg-status-success/20 text-status-success rounded-full animate-pulse">Live</span>
        </h3>
        {error ? <ChartError /> : loading ? <ChartLoading /> : !hourData ? <NoData /> :
          <div className="h-64"><Bar data={hourData} options={baseOptions} /></div>}
      </>
    );
    if (id === 'doughnut') return (
      <>
        <h3 className="text-lg font-semibold mb-4 text-text-primary pr-8">Entradas vs Salidas</h3>
        {error ? <ChartError /> : loading ? <ChartLoading /> : !doughnutData ? <NoData /> :
          <div className="h-64"><Doughnut data={doughnutData} options={noScalesOptions} /></div>}
      </>
    );
    if (id === 'line') return (
      <>
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-between text-text-primary pr-8">
          <span>Tendencia por Día</span>
          <div className="flex gap-2">
            {RANGES.map(r => (
              <button
                key={r}
                onClick={() => setRangeDays(r)}
                className={`px-3 py-1 text-xs rounded-lg transition-all duration-200 ${
                  rangeDays === r
                    ? 'bg-accent-bright/20 text-accent-bright shadow-md'
                    : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80 hover:text-text-primary'
                } hover:scale-105 active:scale-95`}
              >
                {r}D
              </button>
            ))}
          </div>
        </h3>
        {error ? <ChartError /> : loading ? <ChartLoading /> : !lineData ? <NoData /> :
          <div className="h-64"><Line data={lineData} options={baseOptions} /></div>}
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Estadísticas</h2>
        <p className="text-text-secondary">Análisis de las últimas {totalDets} detecciones.</p>
      </div>

      {/* KPI cards — arrastrables */}
      <DragDropContext onDragEnd={onKpiDragEnd}>
        <Droppable droppableId="stats-kpis" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4"
            >
              {kpiOrder.map((id, index) => {
                const kpi = getKpiDef(id, kpiValues);
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group relative flex-1 min-w-0 bg-surface-light/85 backdrop-blur-sm rounded-xl p-5 border transition-all duration-200 ease-out ${
                          snapshot.isDragging
                            ? 'border-primary/70 shadow-glow-primary scale-[1.04] rotate-1 z-50'
                            : 'border-surface-lighter hover:border-primary/50 hover:-translate-y-1 transition-all duration-300'
                        }`}
                      >
                        <DragHandle {...provided.dragHandleProps} />
                        <p className="text-sm text-text-secondary mb-1 pr-6">{kpi.label}</p>
                        {kpi.loading
                          ? <div className="h-8 w-20 bg-surface-lighter animate-pulse rounded" />
                          : <p className={`text-2xl font-bold text-${kpi.color}`}>{kpi.value}</p>
                        }
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

      {/* Chart sections — arrastrables */}
      <DragDropContext onDragEnd={onChartDragEnd}>
        <Droppable droppableId="stats-charts">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {chartOrder.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group relative bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 ease-out ${
                        CHART_META[id].span === 2 ? 'lg:col-span-2' : ''
                      } ${
                        snapshot.isDragging
                          ? 'border-primary/70 shadow-glow-primary scale-[1.01] z-50'
                          : 'border-surface-lighter hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-1'
                      }`}
                    >
                      <DragHandle {...provided.dragHandleProps} />
                      {renderChart(id)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
