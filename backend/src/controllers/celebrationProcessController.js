const { prisma } = require('../lib/prisma');

const getMany = async (req, res) => {
  try {
    const data = await prisma.celebrationProcessStep.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching celebration process steps' });
  }
};

const createOne = async (req, res) => {
  try {
    const { stepNumber, title, description, iconKey, sortOrder } = req.body;
    const item = await prisma.celebrationProcessStep.create({
      data: {
        stepNumber: stepNumber || '',
        title: title || '',
        description: description || '',
        iconKey: iconKey || 'ClipboardEdit',
        sortOrder: sortOrder ?? 0,
      },
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating step' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { stepNumber, title, description, iconKey, sortOrder } = req.body;
    const updated = await prisma.celebrationProcessStep.update({
      where: { id },
      data: { stepNumber, title, description, iconKey, sortOrder },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating step' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.celebrationProcessStep.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting step' });
  }
};

module.exports = { getMany, createOne, updateOne, deleteOne };
