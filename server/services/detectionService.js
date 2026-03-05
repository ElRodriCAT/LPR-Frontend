const config = require('../config');
const db = require('../db');

let io = null;
const recent = new Map();

function init(_io) {
  io = _io;
}

async function handleDetection(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid payload');
  const { event, plate, confidence, timestamp, camera_id, metadata } = payload;
  if (!event || !plate || !timestamp) throw new Error('Missing required fields');

  const now = Date.now();
  const key = `${plate}:${event}:${camera_id || '0'}`;
  const last = recent.get(key);
  if (last && (now - last) / 1000 < config.DUPLICATE_SECONDS) {
    console.log('[DETECTION] Duplicate ignored', key);
    return { ignored: true };
  }
  recent.set(key, now);

  // Emit to websocket clients
  if (io) {
    io.emit('lpr:detection', payload);
  }

  // Persist to DB (best-effort)
  try {
    await db.insertDetection({ event, plate, confidence, timestamp, camera_id, metadata });
  } catch (e) {
    console.error('[DB] insert error', e);
  }

  return { ignored: false };
}

module.exports = { init, handleDetection };
