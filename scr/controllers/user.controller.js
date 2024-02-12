import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from './../models/user.model.js';
import uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = (async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { email, username, fullName, password } = req.body
    //console.log("email: ", email);

    if (
        [email, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    // console.log(req.files.coverImage);
    // console.log(req.files.coverImage.length);
    if (!coverImageLocalPath) {
        throw new ApiError(400, "coverImageLocalPath file is requiredddddddddddd")
    }

    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "Avatar file is requiredddddddddddd")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // // const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // console.log(avatar)
    // if (!avatar) {
    //     throw new ApiError(400, "Avatar file is requirednnnnnnnnnnnnnnn")
    // }


    const user = await User.create({
        fullName,
        // avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username
    })
    console.log(user);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export { registerUser }; 