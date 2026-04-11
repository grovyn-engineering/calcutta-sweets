const cloudinary = require('cloudinary').v2;

const generateSignature = (req, res) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: 'calcutta_admin' },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      success: true,
      data: {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder: 'calcutta_admin'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Signature generation failed", error: error.message });
  }
};

module.exports = { generateSignature };
