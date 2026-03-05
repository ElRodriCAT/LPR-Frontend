module.exports = (sequelize, DataTypes) => {
  const Detection = sequelize.define('Detection', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    event: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    plate: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    confidence: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    camera_id: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'detections',
    timestamps: true
  });

  return Detection;
};
