import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadOnCloudinary = async (localFilePath) =>
    {
        try {
            if(!localFilePath) return null
            //upload on cd
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto",
            })
            //file upload success
            console.log("File uploaded succesfully",response.url);
            return response;
            
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove temp file from local as upload failed
        }
    }