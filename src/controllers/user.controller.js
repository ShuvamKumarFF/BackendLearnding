import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser = asyncHandler(async (req, res)=> {
    res.status(200).json({
        message: "ok"
    })

    const {fullname, username, password}=req.body
    if(username == "")
    {
        throw new ApiError(400, "Username is required");
    }
    if(fullname == "")
        {
            throw new ApiError(400, "fullname is required");
        }
    if(password == "")
    {
        throw new ApiError(400, "password is required");
    }

    const existedUser = User.findOne({
        $or : [
            {username}, {email}
        ]
    })
    if(existedUser)
    {
        throw new ApiError(400, "Account already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(400, "Avatar file is required");
    }

    const user  = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url|| "",
        email,
        password,
        username: username.toLowerCase(),
        
    })
    const createdUser = User.findById(user._id).select("-password -refreshToken")
    if(!createdUser)
    {
        throw new ApiError(500, "Error creating user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
})



export {registerUser}