const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const getPublicMany = async (req, res) => {
  try {
    const data = await prisma.menuProduct.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu' });
  }
};

const getManageMany = async (req, res) => {
  try {
    const data = await prisma.menuProduct.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu' });
  }
};

const getPublicOne = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.menuProduct.findUnique({ where: { id } });
    if (!item || !item.isActive) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching item' });
  }
};

const createOne = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      unit,
      category,
      imageUrl,
      cloudinaryPublicId,
      inventoryProductId,
      sortOrder,
      isActive,
      isSignature,
    } = req.body;

    const invId =
      inventoryProductId && String(inventoryProductId).trim()
        ? String(inventoryProductId).trim()
        : null;

    const item = await prisma.menuProduct.create({
      data: {
        name: name || '',
        description: description ?? '',
        price: price ?? 0,
        unit: unit || '200g',
        category: category || '',
        imageUrl: imageUrl || '',
        publicId: cloudinaryPublicId || '',
        inventoryProductId: invId,
        sortOrder: sortOrder ?? 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        isSignature: isSignature !== undefined ? Boolean(isSignature) : false,
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating item' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const existing = await prisma.menuProduct.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    let oldImageToDelete = null;
    if (existing.publicId) {
      const nextPid = body.cloudinaryPublicId;
      if (nextPid !== undefined && nextPid !== existing.publicId) oldImageToDelete = existing.publicId;
      else if (nextPid === '' && existing.publicId) oldImageToDelete = existing.publicId;
    }

    const updated = await prisma.menuProduct.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : existing.name,
        description: body.description !== undefined ? body.description : existing.description,
        price: body.price !== undefined ? body.price : existing.price,
        unit: body.unit !== undefined ? body.unit : existing.unit,
        category: body.category !== undefined ? body.category : existing.category,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
        publicId:
          body.cloudinaryPublicId !== undefined ? body.cloudinaryPublicId : existing.publicId,
        inventoryProductId:
          body.inventoryProductId !== undefined
            ? body.inventoryProductId && String(body.inventoryProductId).trim()
              ? String(body.inventoryProductId).trim()
              : null
            : existing.inventoryProductId,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : existing.sortOrder,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive,
        isSignature:
          body.isSignature !== undefined ? Boolean(body.isSignature) : existing.isSignature,
      },
    });

    if (oldImageToDelete) deleteImage(oldImageToDelete);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.menuProduct.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    await prisma.menuProduct.delete({ where: { id } });
    if (existing.publicId) deleteImage(existing.publicId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting' });
  }
};

module.exports = {
  getPublicMany,
  getManageMany,
  getPublicOne,
  createOne,
  updateOne,
  deleteOne,
};
