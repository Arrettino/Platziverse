const config = {
  database: process.env.DB_NAME || "platziverse",
  username: process.env.DB_USER || "platzi",
  password: process.env.DB_PASS || "platzi",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  query: {
    raw: true,
  },
};

module.exports = config