module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://techcrowdbacking.com" || "https://tech-crowd-backing-v2-client.vercel.app" ,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres@localhost/tech-crowd-backing-db", 
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://postgres@localhost/tech-crowd-backing-test-db",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: 10000
};
//postgres://axobuouluiczdk:0d592e9e4454b71b39883e14dbe832020c6ee2a1b0911c5c45de8cfd770c178f@ec2-34-225-162-157.compute-1.amazonaws.com:5432/d43no5c5i8qk6b
