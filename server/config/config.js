require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('../config');

module.exports = {
  development: {
    username: DB_USER || process.env.DB_USER || 'root',
    password: DB_PASSWORD || process.env.DB_PASSWORD || null,
    database: DB_NAME || process.env.DB_NAME || 'LPR',
    host: DB_HOST || process.env.DB_HOST || '127.0.0.1',
    port: DB_PORT || process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true
    },
    logging: false
  },
  test: {
    username: DB_USER || process.env.DB_USER || 'root',
    password: DB_PASSWORD || process.env.DB_PASSWORD || null,
    database: DB_NAME || process.env.DB_NAME || 'LPR_test',
    host: DB_HOST || process.env.DB_HOST || '127.0.0.1',
    port: DB_PORT || process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: DB_USER || process.env.DB_USER || 'root',
    password: DB_PASSWORD || process.env.DB_PASSWORD || null,
    database: DB_NAME || process.env.DB_NAME || 'LPR',
    host: DB_HOST || process.env.DB_HOST || '127.0.0.1',
    port: DB_PORT || process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
};
