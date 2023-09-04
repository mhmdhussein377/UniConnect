const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

const handleError = (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            error: {
                status: err.status || 500,
                message: err.message || "Internam Server Error"
            }
        })
}

module.exports = {createError, handleError}