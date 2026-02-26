export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Configuración</h2>
        <p className="text-gray-400">Ajustes del sistema LPR.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
          <h3 className="text-lg font-semibold mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nombre del Sistema</label>
              <input
                type="text"
                defaultValue="LPR System"
                className="w-full px-4 py-2 bg-lpr-700 border border-lpr-600 rounded-lg focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Zona Horaria</label>
              <select className="w-full px-4 py-2 bg-lpr-700 border border-lpr-600 rounded-lg focus:outline-none focus:border-accent-cyan">
                <option>America/Argentina/Buenos_Aires</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700">
          <h3 className="text-lg font-semibold mb-4">Notificaciones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Alertas por email</span>
              <div className="w-12 h-6 bg-accent-green/30 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-accent-green rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Alertas en pantalla</span>
              <div className="w-12 h-6 bg-accent-green/30 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-accent-green rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Sonido de alertas</span>
              <div className="w-12 h-6 bg-lpr-600 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-lpr-800 rounded-xl p-6 border border-lpr-700 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Acerca del Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Versión</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-gray-400">Última actualización</p>
              <p className="font-medium">26/02/2026</p>
            </div>
            <div>
              <p className="text-gray-400">Licencia</p>
              <p className="font-medium">Enterprise</p>
            </div>
            <div>
              <p className="text-gray-400">Soporte</p>
              <p className="font-medium text-accent-cyan">soporte@lpr.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
