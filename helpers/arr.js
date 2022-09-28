const Gender={
    MALE:'male',
    FAMALE:'female',
    NONE:'none'
}
const Http={
    OK:200,
    CREATED: 201,
    NO_CONTENT:204,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS:429,
    INTERNAL_SERVER_ERROR:500
}
const limiter = {
    windowMs: 15 * 60 * 1000,
    max: 1000,
    hendler: (req,res,next) => {
        return res.status(Http.TOO_MANY_REQUESTS)
            .json({
                status: 'error',
                code: Http.TOO_MANY_REQUESTS,
                message: 'пользователь отправил слишком много запросов за последнее время'
            })
  }
}
export default {
    Gender,
    Http,
    limiter
}