const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            successs: false,
            message : error.message
        })
    }
}

export {asyncHandler};