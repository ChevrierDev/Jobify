const { query } = require("express");
const { Pool } = require("pg");
require("dotenv").config();

console.log(process.env.DB_PASSWORD);

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: "localhost",
  database: "Shopify",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
