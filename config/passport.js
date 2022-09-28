import passport from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import dotenv from 'dotenv/config'
const SECRET_KEY = process.env.SECRET_KEY
import User from '../repositories/users.js'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY

passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
            const user = await User.findById(payload.id)
            if (! user) {
                return done(new Error('User not found'))}

            if (! user.token) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            return done(err, false)
        }
    }
))

export default passport