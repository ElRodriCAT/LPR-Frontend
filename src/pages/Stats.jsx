export default function Stats() {
  return (
    // 🎯 Fade-in para toda la página
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Estadísticas</h2>
        <p className="text-text-secondary">Análisis y métricas del sistema LPR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder 1 - 🎯 Con animación escalonada y mayor opacidad */}
        <div 
          className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: '100ms' }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-text-primary">
            Detecciones por Hora
            <span className="text-xs px-2 py-0.5 bg-status-success/20 text-status-success rounded-full animate-pulse">Live</span>
          </h3>
          {/* 🎯 Placeholder con hover */}
          <div className="h-64 flex items-center justify-center bg-surface-lighter/50 rounded-lg transition-all duration-300 hover:bg-surface-lighter">
            <span className="text-text-muted transition-colors duration-200">Gráfico de barras</span>
          </div>
        </div>

        {/* Chart Placeholder 2 con mayor opacidad */}
        <div 
          className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: '200ms' }}
        >
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Distribución por Cámara</h3>
          <div className="h-64 flex items-center justify-center bg-surface-lighter/50 rounded-lg transition-all duration-300 hover:bg-surface-lighter">
            <span className="text-text-muted transition-colors duration-200">Gráfico circular</span>
          </div>
        </div>

        {/* Chart Placeholder 3 - 🎯 Full width con animación y mayor opacidad */}
        <div 
          className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1 lg:col-span-2"
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-between text-text-primary">
            <span>Tendencia Semanal</span>
            {/* 🎯 Selector de rango con animación */}
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map((range, idx) => (
                <button
                  key={range}
                  className={`px-3 py-1 text-xs rounded-lg transition-all duration-200 ${
                    idx === 0 
                      ? 'bg-accent-bright/20 text-accent-bright shadow-md' 
                      : 'bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80 hover:text-text-primary'
                  } hover:scale-105 active:scale-95`}
                >
                  {range}
                </button>
              ))}
            </div>
          </h3>
          <div className="h-64 flex items-center justify-center bg-surface-lighter/50 rounded-lg transition-all duration-300 hover:bg-surface-lighter">
            <span className="text-text-muted transition-colors duration-200">Gráfico de líneas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
