
module.exports = (err,req,res,next) => {

    let err_code, err_msg
    const { str_code } = err

    switch (str_code) {
        case 'REGISTER_VALIDATION':
            err_code = 400
            err_msg = err.err_data
            break
        case 'INCORRECT_PASSWORD':
            err_code = 400
            err_msg = ' Incorrect password'
            break
        case 'EMAIL_NOT_FOUND':
            err_code = 404
            err_msg = ' Email not found'
            break
        case 'INTERNAL_SERVER_ERROR':
            err_code = 500
            err_msg = ' Internal Server Error'
            break
        default:
            err_code = 400 
            str_code = '_ERROR_'
            err_msg  = '_ERROR_'
    }


    res.status(err_code).json({
        err_code, 
        str_code, 
        err_msg 
    })

}