module.exports = {
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtSession: {
      session: false
  },
  mongoURI: process.env.MONGO_URI
};
