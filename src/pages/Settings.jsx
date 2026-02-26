export default function Settings() {
  return (
    // 🎯 Fade-in para toda la página
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Configuración</h2>
        <p className="text-text-secondary">Ajustes del sistema LPR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings - 🎯 Card con animación y mayor opacidad */}
        <div className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 transition-all duration-300" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2 transition-colors duration-200">Nombre del Sistema</label>
              {/* 🎯 Input con focus animado: borde + shadow + lift */}
              <input
                type="text"
                defaultValue="LPR System"
                className="w-full px-4 py-2 bg-surface-lighter border border-surface-lighter rounded-lg text-text-primary
                  focus:outline-none focus:border-accent-bright focus:shadow-lg focus:shadow-accent-bright/20 
                  transition-all duration-300 hover:border-primary/50 focus:scale-[1.01]"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2 transition-colors duration-200">Zona Horaria</label>
              {/* 🎯 Select con animaciones similares */}
              <select className="w-full px-4 py-2 bg-surface-lighter border border-surface-lighter rounded-lg text-text-primary
                focus:outline-none focus:border-accent-bright focus:shadow-lg focus:shadow-accent-bright/20 
                transition-all duration-300 hover:border-primary/50 hover:cursor-pointer">
                <option>America/Argentina/Buenos_Aires</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications - 🎯 Card con animación, delays escalonados y mayor opacidad */}
        <div className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 transition-all duration-300" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Notificaciones</h3>
          <div className="space-y-4">
            {/* 🎯 Toggle ON con animaciones suaves */}
            <div className="flex items-center justify-between group">
              <span className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">Alertas por email</span>
              <button className="w-12 h-6 bg-status-success/30 rounded-full relative cursor-pointer transition-all duration-300 hover:bg-status-success/40 hover:scale-105 active:scale-95">
                {/* 🎯 Bolita con transición suave (derecha = ON) */}
                <div className="absolute right-1 top-1 w-4 h-4 bg-status-success rounded-full transition-all duration-300 shadow-lg shadow-status-success/50" />
              </button>
            </div>
            
            <div className="flex items-center justify-between group">
              <span className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">Alertas en pantalla</span>
              <button className="w-12 h-6 bg-status-success/30 rounded-full relative cursor-pointer transition-all duration-300 hover:bg-status-success/40 hover:scale-105 active:scale-95">
                <div className="absolute right-1 top-1 w-4 h-4 bg-status-success rounded-full transition-all duration-300 shadow-lg shadow-status-success/50" />
              </button>
            </div>
            
            {/* 🎯 Toggle OFF con animaciones (izquierda = OFF) */}
            <div className="flex items-center justify-between group">
              <span className="text-text-secondary transition-colors duration-200 group-hover:text-text-primary">Sonido de alertas</span>
              <button className="w-12 h-6 bg-surface-lighter rounded-full relative cursor-pointer transition-all duration-300 hover:bg-surface-lighter/80 hover:scale-105 active:scale-95">
                {/* 🎯 Bolita en posición izquierda */}
                <div className="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full transition-all duration-300 shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* About - 🎯 Full width card con animación y mayor opacidad */}
        <div className="opacity-0 animate-fadeInUp bg-surface-light/85 backdrop-blur-sm rounded-xl p-6 border border-surface-lighter hover:border-primary/50 transition-all duration-300 lg:col-span-2" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Acerca del Sistema</h3>
          {/* 🎯 Grid con hover en cada item */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-surface-lighter/50">
              <p className="text-text-secondary">Versión</p>
              <p className="font-medium text-text-primary">1.0.0</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-surface-lighter/50">
              <p className="text-text-secondary">Última actualización</p>
              <p className="font-medium text-text-primary">26/02/2026</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-surface-lighter/50">
              <p className="text-text-secondary">Licencia</p>
              <p className="font-medium text-text-primary">Enterprise</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-surface-lighter/50">
              <p className="text-text-secondary">Soporte</p>
              {/* 🎯 Email con hover especial */}
              <p className="font-medium text-accent-bright transition-all duration-200 hover:underline hover:scale-105 cursor-pointer">
                soporte@lpr.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
