module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://techcrowdbacking.com",
  DATABASE_URL:process.env.DATABASE_URL ||
    "postgresql://postgres@localhost/tech-crowd-backing-db", 
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://postgres@localhost/tech-crowd-backing-test-db",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: 10000
};
