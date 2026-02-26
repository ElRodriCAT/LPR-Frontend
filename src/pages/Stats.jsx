export default function Stats() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Estadísticas</h2>
        <p className="text-gray-400">Análisis y métricas del sistema LPR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder 1 */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
          <h3 className="text-lg font-semibold mb-4">Detecciones por Hora</h3>
          <div className="h-64 flex items-center justify-center bg-lpr-700/50 rounded-lg">
            <span className="text-gray-500">Gráfico de barras</span>
          </div>
        </div>

        {/* Chart Placeholder 2 */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
          <h3 className="text-lg font-semibold mb-4">Distribución por Cámara</h3>
          <div className="h-64 flex items-center justify-center bg-lpr-700/50 rounded-lg">
            <span className="text-gray-500">Gráfico circular</span>
          </div>
        </div>

        {/* Chart Placeholder 3 */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Tendencia Semanal</h3>
          <div className="h-64 flex items-center justify-center bg-lpr-700/50 rounded-lg">
            <span className="text-gray-500">Gráfico de líneas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
