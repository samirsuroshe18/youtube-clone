import asyncHandler from '../utils/asynchandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteCloudinary } from '../utils/cloudinary.js';
import { Video } from '../models/video.model.js';

const uploadVideo = asyncHandler(async (req, res) => {
    const videoLocalPath = req.file?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is missing");
    }

    // const cloudinaryPath = await req.user.video;

    // if (cloudinaryPath) {
    //     await deleteCloudinary(cloudinaryPath);
    // }

    const video = await uploadOnCloudinary(videoLocalPath);

    if (!video.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const response = await Video.create({
        videoUrl: video.url,
    })

    return res.status(200).json(
        new ApiResponse(200, response, "Avatar image uploaded successfully")
    )
})

export {
    uploadVideo
};
