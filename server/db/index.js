const models = require('../models');

module.exports = {
  async insertDetection(d) {
    try {
      if (!models || !models.Detection) {
        console.log('[DB] Sequelize not initialized or Detection model missing, skipping insert');
        return;
      }
      await models.Detection.create({
        event: d.event,
        plate: d.plate,
        confidence: d.confidence,
        timestamp: d.timestamp,
        camera_id: d.camera_id || null,
        metadata: d.metadata || null
      });
    } catch (e) {
      console.error('[DB] insertDetection error', e);
    }
  },

  async query(sql, params) {
    // For simple reads we fallback to raw query via sequelize
    try {
      if (!models || !models.sequelize) return [];
      const [results] = await models.sequelize.query(sql, { replacements: params });
      return results;
    } catch (e) {
      console.error('[DB] query error', e);
      return [];
    }
  }
};
