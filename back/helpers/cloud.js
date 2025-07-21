// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// cloudinary.config({ 
//     cloud_name: 'dwb8ktgnk', 
//     api_key: '951329893331124', 
//     api_secret: "FrhPZJlZmmdoLd9x2oiN4AwmPUc" 
// });

// const storage = new multer.memoryStorage();
// async function imageUploadUtil(file){

//     const result = await cloudinary.uploader.upload(file,{
//         resource_type :'auto'
//     })
//     return result;
// }

// const upload=multer({storage})

// module.exports={upload,imageUploadUtil};

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config(); // Load .env variables

// Configure Cloudinary with environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();

// Upload utility
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  });
  return result;
}

// Export multer upload middleware and utility
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
