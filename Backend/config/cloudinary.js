const { v2: cloudinary } = require('cloudinary'); // Change import to require

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
};

module.exports = connectCloudinary; // Change export default to module.exports
