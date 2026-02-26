// 🎨 Skeleton Loaders Sobrios para Sistema LPR
// Componentes de carga que mantienen el estilo profesional del dashboard

/**
 * Skeleton básico para cualquier elemento
 * Uso: <Skeleton className="h-8 w-32" />
 */
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-lpr-700/50 rounded-lg animate-pulse ${className}`}
      style={{
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      }}
    />
  );
}

/**
 * Skeleton para Cards de estadísticas (Dashboard)
 * Uso: <SkeletonStatCard />
 */
export function SkeletonStatCard() {
  return (
    <div className="bg-lpr-800 rounded-xl p-5 border border-lpr-700">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}

/**
 * Skeleton para tabla de logs
 * Uso: <SkeletonTableRow />
 */
export function SkeletonTableRow() {
  return (
    <tr className="border-b border-lpr-700">
      <td className="px-6 py-4">
        <Skeleton className="h-8 w-24" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-16" />
      </td>
      <td className="px-6 py-4 flex justify-center">
        <Skeleton className="h-8 w-8 rounded-lg" />
      </td>
    </tr>
  );
}

/**
 * Skeleton para card de cámara
 * Uso: <SkeletonCameraCard />
 */
export function SkeletonCameraCard() {
  return (
    <div className="bg-lpr-800 rounded-xl border border-lpr-700 overflow-hidden">
      <Skeleton className="aspect-video" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/**
 * Skeleton para gráficos (Stats)
 * Uso: <SkeletonChart />
 */
export function SkeletonChart() {
  return (
    <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="h-64 bg-lpr-700/50 rounded-lg flex items-end justify-around p-4 gap-2">
        {/* Barras simuladas con alturas variables */}
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-44" />
      </div>
    </div>
  );
}

/**
 * Skeleton para item de actividad reciente
 * Uso: <SkeletonActivityItem />
 */
export function SkeletonActivityItem() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-lpr-700">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

// 🎯 Agregar esta animación CSS en index.css si quieres personalizar el pulso:
/*
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
*/

// 📌 EJEMPLOS DE USO:

// Ejemplo 1: Dashboard con loading
/*
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setStats([...data]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonStatCard key={i} />)}
        </div>
      </div>
    );
  }

  return <div>...contenido real...</div>;
}
*/

// Ejemplo 2: Tabla de logs con loading
/*
<tbody>
  {loading ? (
    <>
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
    </>
  ) : (
    logs.map((log) => <tr key={log.id}>...</tr>)
  )}
</tbody>
*/

// Ejemplo 3: Grid de cámaras con loading
/*
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {loading ? (
    [1, 2, 3, 4].map((i) => <SkeletonCameraCard key={i} />)
  ) : (
    cameras.map((camera) => <CameraCard key={camera.id} {...camera} />)
  )}
</div>
*/

// Ejemplo 4: Skeleton inline personalizado
/*
<Skeleton className="h-10 w-48 rounded-full" />
<Skeleton className="h-4 w-full max-w-md mt-2" />
*/
