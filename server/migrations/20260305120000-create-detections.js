'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detections', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      event: { type: Sequelize.STRING(32), allowNull: false },
      plate: { type: Sequelize.STRING(32), allowNull: false },
      confidence: { type: Sequelize.DOUBLE, allowNull: true },
      timestamp: { type: Sequelize.DATE, allowNull: false },
      camera_id: { type: Sequelize.STRING(64), allowNull: true },
      metadata: { type: Sequelize.JSON, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
    await queryInterface.addIndex('detections', ['plate']);
    await queryInterface.addIndex('detections', ['timestamp']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('detections');
  }
};
