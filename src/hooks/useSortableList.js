import { useState } from 'react';

function reorder(list, from, to) {
  const result = [...list];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

/**
 * Mantiene una lista reordenable con persistencia en localStorage.
 * @param {string} storageKey  - Clave de localStorage
 * @param {string[]} defaults  - IDs en orden por defecto
 */
export function useSortableList(storageKey, defaults) {
  const [order, setOrder] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      if (
        Array.isArray(saved) &&
        saved.length === defaults.length &&
        defaults.every(id => saved.includes(id))
      ) return saved;
    } catch {}
    return defaults;
  });

  function onDragEnd({ source, destination }) {
    if (!destination || destination.index === source.index) return;
    const next = reorder(order, source.index, destination.index);
    setOrder(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }

  return { order, onDragEnd };
}
