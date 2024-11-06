// Helper function to upload images to Cloudinary using streams
const cloudinary = require('../config/cloudinary');
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);  
    });
};

const uploadImagesToCloudinary = async (files) => {
    try {
        return Promise.all(files.map(file => uploadImageToCloudinary(file)));
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

module.exports = {
    uploadImagesToCloudinary , uploadImageToCloudinary
}