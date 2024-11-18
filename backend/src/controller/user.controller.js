import asyncHandler from '../utils/asynchandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary, deleteCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        // when we use save() method then all the fields are neccesary so to avoid that we have to pass an object with property {validatBeforeSave:false}
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something wwnt wrong while generating refresh and access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password } = req.body;

    if (!userName?.trim() || !email?.trim() || !fullName?.trim() || !password?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, 'User with same email or username already exists');
    }

    // Check if 'avatar' is present in req.files and it is an array with at least one element
    if (!req.files?.avatar || !Array.isArray(req.files.avatar) || req.files.avatar.length === 0) {
        throw new ApiError(400, 'Avatar file is required');
    }

    const avatarLocalPath = req.files.avatar[0].path;
    const coverImgLocalPath = req.files.coverImage ? req.files.coverImage[0].path : null;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file upload failed");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;

    if (!userName && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // you cant access isPasswordCorrect method directly through 'User' beacause User is mogoose object 
    // these methods is applied only the instance of the user when mongoose return its instance
    // you can acces User.findOne() but you cant access User.isPasswordCorrect()
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credential");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //option object is created beacause we dont want to modified the cookie to front side
    const option = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie('accessToken', accessToken, option).cookie('refreshToken', refreshToken, option)
        .json(
            new ApiResponse(200, { loggedInUser, accessToken, refreshToken }, "User logged in sucessully")
        )
});


const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", option).clearCookie("refreshToken", option).json(
        new ApiResponse(200, {}, "User logged out")
    )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookie?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken != user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const option = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        return res.status(200).clearCookie("accessToken", accessToken, option).clearCookie("refreshToken", refreshToken, option).json(
            new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed")
        );
    } catch (error) {
        throw new ApiError(401, "Something went wrong : Invalid refresh token");
    }
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password is incorrect");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user serched successfully")
    );
})


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName && !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
            email,
        }
    }, { new: true }).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200, user, "Account details updated successfully")
    );
})


const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const cloudinaryPath = await req.user.avatar;

    if (cloudinaryPath) {
        await deleteCloudinary(cloudinaryPath);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, user, "Avatar image uploaded successfully")
    )
})


const updateUsercoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, user, "coverImage image uploaded successfully")
    )
})


const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { userName } = req.param;

    if (!userName) {
        throw new ApiError(400, "User name is missing");
    }

    const channel = await User.aggregate([
        {
            $match: {
                userName: userName.toLowerCase()
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscriberTo"
            }
        },

        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelSubscribeToCount: {
                    $size: "$subscriberTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },

        {
            $project: {
                userName: 1,
                email: 1,
                fullName: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                channelSubscribeToCount: 1,
                isSubscribed: 1
            }
        }
    ]);

    if (!channel?.length) {
        throw new ApiError(404, "Channel does not exists")
    }

    res.status(200).json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});


const getWatchedHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },

        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        userName: 1,
                                        fullName: 1,
                                        avatar: 1
                                    }
                                },

                                {
                                    $addFields: {
                                        owner: {
                                            $first: "$owner"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]);

    res.status(200).json(200, user.watchHistory, "Watched History fetched successfully");
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUsercoverImage,
    getUserChannelProfile,
    getWatchedHistory
};
