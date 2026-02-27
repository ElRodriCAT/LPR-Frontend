import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook genérico de polling.
 * Ejecuta `fetchFn` cada `interval` ms y expone { data, loading, error, refresh }.
 *
 * @param {Function} fetchFn       - Función async que retorna los datos
 * @param {number}   interval      - Intervalo de polling en ms (default 5000)
 * @param {any}      defaultData   - Valor inicial de data
 */
export function usePolling(fetchFn, interval = 5000, defaultData = null) {
  const [data, setData]       = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const timerRef              = useRef(null);

  const run = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    run();
    timerRef.current = setInterval(run, interval);
    return () => clearInterval(timerRef.current);
  }, [run, interval]);

  return { data, loading, error, refresh: run };
}
