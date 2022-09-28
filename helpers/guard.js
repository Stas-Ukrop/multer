import passport from 'passport'
import  '../config/passport.js'
import consta from './arr.js'



const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const headerAuth = req.get('Authorization')
        let token = null
        if (headerAuth) {
            token=headerAuth.split(' ')[1]
        }
        if (err || !user || token != user?.token) {
            return res.status(consta.Http.UNAUTHORIZED).json({status:'Error',code:consta.Http.UNAUTHORIZED,message:'Invalid credentials'})
        }
        req.user = user
        return next()
    })(req,res,next)
}

export default guard