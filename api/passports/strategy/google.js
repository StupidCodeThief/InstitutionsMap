const assert = require('assert')
const GoogleStrategy = require('passport-google').Strategy
const User = require('../models/User')

assert(process.env.GOOGLE_APP_ID)
assert(process.env.GOOGLE_APP_SECRET)
assert(process.env.APP_URL)

module.exports = () => {
  return new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOrCreate({ google_id: profile.id }, {
        google_id: profile.id,
        name: profile.displayName,
        provider: 'google'
      })
      return done(null, user.toJSON())
    } catch (err) {
      return done(err)
    }
  })
}