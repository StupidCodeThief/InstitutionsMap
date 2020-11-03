const assert = require('assert')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User')

// assert(process.env.FACEBOOK_APP_ID)
// assert(process.env.FACEBOOK_APP_SECRET)
// assert(process.env.APP_URL)

module.exports = () => {
  return new FacebookStrategy({
    clientID: 2769260053317770,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/facebook/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOrCreate({ facebook_id: profile.id }, {
        facebook_id: profile.id,
        name: profile.displayName,
        provider: 'facebook'
      })
      return done(null, user.toJSON())
    } catch (err) {
      return done(err)
    }
  })
}