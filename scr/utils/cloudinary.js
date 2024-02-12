import { v2 as cloudinary } from "cloudinary"
import fs from "fs"




// cloudinary.config({
//   cloud_name: process.env.COUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


cloudinary.config({
  cloud_name: 'dywt44wbh',
  api_key: '798348424312663',
  api_secret: '***************************'
});


//  
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath)

    return response;

  } catch (error) {
    console.log("big error", error)
    // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed

  }
}
 




export default uploadOnCloudinary
