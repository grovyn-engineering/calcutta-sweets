const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getMany = async (req, res) => {
  try {
    const data = await prisma.visitUsFeature.findMany({
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching visit features' });
  }
};

const createOne = async (req, res) => {
  try {
    const { title, description, imageUrl, cloudinaryPublicId, sortOrder } = req.body;
    const item = await prisma.visitUsFeature.create({
      data: {
        title: title || '',
        description: description ?? '',
        imageUrl: imageUrl || '',
        publicId: cloudinaryPublicId || null,
        sortOrder: sortOrder ?? 0,
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating feature' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const existing = await prisma.visitUsFeature.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    let oldImageToDelete = null;
    if (existing.publicId) {
      const nextPid = body.cloudinaryPublicId;
      if (nextPid !== undefined && nextPid !== existing.publicId) oldImageToDelete = existing.publicId;
      else if (nextPid === '' && existing.publicId) oldImageToDelete = existing.publicId;
    }

    const updated = await prisma.visitUsFeature.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        description: body.description !== undefined ? body.description : existing.description,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
        publicId:
          body.cloudinaryPublicId !== undefined ? body.cloudinaryPublicId || null : existing.publicId,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : existing.sortOrder,
      },
    });

    if (oldImageToDelete) deleteImage(oldImageToDelete);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating feature' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.visitUsFeature.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    await prisma.visitUsFeature.delete({ where: { id } });
    if (existing.publicId) deleteImage(existing.publicId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting feature' });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
