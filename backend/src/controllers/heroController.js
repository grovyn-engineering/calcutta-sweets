const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getHero = async (req, res) => {
  try {
    const hero = await prisma.heroSection.findFirst();
    res.json({ success: true, data: hero || null });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching hero data" });
  }
};

const updateHero = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, cloudinaryPublicId } = req.body;
    const existingHero = await prisma.heroSection.findFirst();
    
    let oldImageToDelete = null;

    if (existingHero?.publicId) {
      if (cloudinaryPublicId && existingHero.publicId !== cloudinaryPublicId) {
        oldImageToDelete = existingHero.publicId;
      } else if (!cloudinaryPublicId && existingHero.publicId) {
        oldImageToDelete = existingHero.publicId;
      }
    }

    const updatedHero = await prisma.heroSection.upsert({
      where: { id: existingHero?.id || "nonexistent" },
      update: { 
        title, 
        subtitle, 
        imageUrl: imageUrl !== undefined ? imageUrl : existingHero?.imageUrl,
        publicId: cloudinaryPublicId !== undefined ? cloudinaryPublicId : existingHero?.publicId
      },
      create: { 
        title, 
        subtitle, 
        imageUrl: imageUrl || "", 
        publicId: cloudinaryPublicId || "" 
      },
    });

    if (oldImageToDelete) {
      deleteImage(oldImageToDelete);
    }

    res.json({ success: true, data: updatedHero });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

module.exports = { getHero, updateHero };