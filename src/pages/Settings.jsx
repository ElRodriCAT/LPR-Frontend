export default function Settings() {
  return (
    // 🎯 Fade-in para toda la página
    <div className="space-y-6 animate-fadeIn">
      <div className="opacity-0 animate-slideInDown">
        <h2 className="text-3xl font-bold mb-2">Configuración</h2>
        <p className="text-gray-400">Ajustes del sistema LPR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings - 🎯 Card con animación */}
        <div className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl p-6 border border-lpr-700 hover:border-lpr-600 transition-all duration-300" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2 transition-colors duration-200">Nombre del Sistema</label>
              {/* 🎯 Input con focus animado: borde + shadow + lift */}
              <input
                type="text"
                defaultValue="LPR System"
                className="w-full px-4 py-2 bg-lpr-700 border border-lpr-600 rounded-lg 
                  focus:outline-none focus:border-accent-cyan focus:shadow-lg focus:shadow-accent-cyan/20 
                  transition-all duration-300 hover:border-lpr-500 focus:scale-[1.01]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 transition-colors duration-200">Zona Horaria</label>
              {/* 🎯 Select con animaciones similares */}
              <select className="w-full px-4 py-2 bg-lpr-700 border border-lpr-600 rounded-lg 
                focus:outline-none focus:border-accent-cyan focus:shadow-lg focus:shadow-accent-cyan/20 
                transition-all duration-300 hover:border-lpr-500 hover:cursor-pointer">
                <option>America/Argentina/Buenos_Aires</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications - 🎯 Card con animación y delays escalonados */}
        <div className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl p-6 border border-lpr-700 hover:border-lpr-600 transition-all duration-300" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold mb-4">Notificaciones</h3>
          <div className="space-y-4">
            {/* 🎯 Toggle ON con animaciones suaves */}
            <div className="flex items-center justify-between group">
              <span className="text-gray-300 transition-colors duration-200 group-hover:text-white">Alertas por email</span>
              <button className="w-12 h-6 bg-accent-green/30 rounded-full relative cursor-pointer transition-all duration-300 hover:bg-accent-green/40 hover:scale-105 active:scale-95">
                {/* 🎯 Bolita con transición suave (derecha = ON) */}
                <div className="absolute right-1 top-1 w-4 h-4 bg-accent-green rounded-full transition-all duration-300 shadow-lg shadow-accent-green/50" />
              </button>
            </div>
            
            <div className="flex items-center justify-between group">
              <span className="text-gray-300 transition-colors duration-200 group-hover:text-white">Alertas en pantalla</span>
              <button className="w-12 h-6 bg-accent-green/30 rounded-full relative cursor-pointer transition-all duration-300 hover:bg-accent-green/40 hover:scale-105 active:scale-95">
                <div className="absolute right-1 top-1 w-4 h-4 bg-accent-green rounded-full transition-all duration-300 shadow-lg shadow-accent-green/50" />
              </button>
            </div>
            
            {/* 🎯 Toggle OFF con animaciones (izquierda = OFF) */}
            <div className="flex items-center justify-between group">
              <span className="text-gray-300 transition-colors duration-200 group-hover:text-white">Sonido de alertas</span>
              <button className="w-12 h-6 bg-lpr-600 rounded-full relative cursor-pointer transition-all duration-300 hover:bg-lpr-500 hover:scale-105 active:scale-95">
                {/* 🎯 Bolita en posición izquierda */}
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full transition-all duration-300 shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* About - 🎯 Full width card con animación */}
        <div className="opacity-0 animate-fadeInUp bg-lpr-800 rounded-xl p-6 border border-lpr-700 hover:border-lpr-600 transition-all duration-300 lg:col-span-2" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold mb-4">Acerca del Sistema</h3>
          {/* 🎯 Grid con hover en cada item */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-lpr-700/50">
              <p className="text-gray-400">Versión</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-lpr-700/50">
              <p className="text-gray-400">Última actualización</p>
              <p className="font-medium">26/02/2026</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-lpr-700/50">
              <p className="text-gray-400">Licencia</p>
              <p className="font-medium">Enterprise</p>
            </div>
            <div className="p-3 rounded-lg transition-all duration-200 hover:bg-lpr-700/50">
              <p className="text-gray-400">Soporte</p>
              {/* 🎯 Email con hover especial */}
              <p className="font-medium text-accent-cyan transition-all duration-200 hover:underline hover:scale-105 cursor-pointer">
                soporte@lpr.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
