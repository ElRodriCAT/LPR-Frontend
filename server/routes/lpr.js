const express = require('express');
const router = express.Router();
const detectionService = require('../services/detectionService');
const config = require('../config');
const db = require('../db');

router.post('/detection', async (req, res) => {
  const apiKey = req.header('x-api-key') || '';
  if (config.API_KEY && apiKey !== config.API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    await detectionService.handleDetection(req.body);
    return res.json({ ok: true });
  } catch (e) {
    console.error('[LPR ROUTE] error', e);
    return res.status(400).json({ error: e.message });
  }
});

router.get('/detections', async (req, res) => {
  const limit = parseInt(req.query.limit || '50', 10);
  try {
    const rows = await db.query('SELECT * FROM detections ORDER BY timestamp DESC LIMIT ?', [limit]);
    return res.json({ data: rows });
  } catch (e) {
    console.error('[LPR ROUTE] db error', e);
    return res.status(500).json({ error: 'db_error' });
  }
});

module.exports = router;
