require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || '';

const DB_URL = process.env.DB_URL || (
  DB_USER && DB_PASSWORD && DB_HOST && DB_NAME
    ? `mysql://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : ''
);

module.exports = {
  PORT: process.env.PORT || 9000,
  DB_URL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  API_KEY: process.env.LPR_API_KEY || '',
  DUPLICATE_SECONDS: parseInt(process.env.DUPLICATE_SECONDS || '300', 10),
};
