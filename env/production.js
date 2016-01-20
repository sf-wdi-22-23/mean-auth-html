var port = process.env.PORT;

module.exports = {
  port: port,
  db: process.env.MONGOLAB_URI,
  emailpass: process.env.EMAIL_PASSWORD,
  TOKEN_SECRET: process.env.TOKEN_SECRET
};