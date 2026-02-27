/**
 * LPR API Service
 * Todas las peticiones apuntan a /api (proxeado a LPR_node en http://localhost:9000)
 */

const BASE = '/api/lpr';

/**
 * Obtiene el listado de detecciones.
 * @param {Object} filters - { limit, event, plate, startDate, endDate }
 */
export async function getDetections(filters = {}) {
  const params = new URLSearchParams();
  if (filters.limit)     params.set('limit',     filters.limit);
  if (filters.event)     params.set('event',     filters.event);
  if (filters.plate)     params.set('plate',     filters.plate);
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate)   params.set('endDate',   filters.endDate);

  const res = await fetch(`${BASE}/detections?${params.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data ?? [];
}

/**
 * Obtiene el listado de vehículos.
 * @param {Object} filters - { status: 'inside' | 'outside' }
 */
export async function getVehicles(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);

  const res = await fetch(`${BASE}/vehicles?${params.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data ?? [];
}

/**
 * Obtiene el detalle de un vehículo por patente.
 * @param {string} plate
 */
export async function getVehicle(plate) {
  const res = await fetch(`${BASE}/vehicle/${encodeURIComponent(plate)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data ?? null;
}

/**
 * Limpia todo el historial (detecciones y vehículos).
 */
export async function clearDetections() {
  const res = await fetch(`${BASE}/detections`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
