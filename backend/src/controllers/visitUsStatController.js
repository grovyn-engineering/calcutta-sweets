const { prisma } = require('../lib/prisma');

const getMany = async (req, res) => {
  try {
    const data = await prisma.visitUsStat.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching visit us stats' });
  }
};

const createOne = async (req, res) => {
  try {
    const { value, label, sortOrder } = req.body;
    const item = await prisma.visitUsStat.create({
      data: {
        value: value || '',
        label: label || '',
        sortOrder: sortOrder ?? 0,
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating visit us stat' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, label, sortOrder } = req.body;
    const updated = await prisma.visitUsStat.update({
      where: { id },
      data: { value, label, sortOrder },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating visit us stat' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.visitUsStat.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting visit us stat' });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
