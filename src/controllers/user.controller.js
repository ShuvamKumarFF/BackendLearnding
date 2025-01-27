import {asyncHandler} from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res)=> {
    res.status(200).json({
        message: "ok"
    })

    const {fullname, username, password}=req.body
    console.log(username);
})



export {registerUser}