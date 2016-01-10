var port = 1337;

module.exports = {
  port: port,
  db: 'mongodb://localhost/mean-auth-html',
  emailpass: process.env.EMAIL_PASSWORD,
  TOKEN_SECRET: process.env.TOKEN_SECRET
};