import { v2 as cloudinary, UploadApiResponse } from "cloudinary"

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
})

export const uploadMedia = async (file: any) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        })
        return uploadResponse
    } catch (error) {
        console.log(error)
    }
}
