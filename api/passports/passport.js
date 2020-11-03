

const User = require('../database/models/User')
const facebookStrategy = require('./strategy/facebook')
const googleStrategy = require('./strategy/google')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
      return done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ id })
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(facebookStrategy())
  passport.use(googleStrategy())
}