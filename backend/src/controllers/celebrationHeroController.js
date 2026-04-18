const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

const DEFAULT_ID = 'default';

const DEFAULT_ROW = {
  id: DEFAULT_ID,
  eyebrow: 'BULK & CUSTOM ORDERS',
  title: 'Sweeten Every Celebration.',
  subtitle:
    'From custom gift boxes to wedding platters, we help make your celebrations a bit sweeter. Everything is made by hand and delivered fresh to your door.',
  mainImageUrl: '/images/sweet8.jpg',
  mainPublicId: null,
  secondaryLeftUrl: '/images/sweet5.jpg',
  secondaryLeftPublicId: null,
  secondaryRightUrl: '/images/sweet6.jpg',
  secondaryRightPublicId: null,
};

function queueCloudinaryDelete(oldPid, nextPid, nextUrl) {
  if (!oldPid) return null;
  if (nextPid !== undefined && nextPid !== oldPid) return oldPid;
  if (nextUrl === '') return oldPid;
  return null;
}

const getOne = async (req, res) => {
  try {
    let data = await prisma.celebrationHero.findUnique({ where: { id: DEFAULT_ID } });
    if (!data) {
      data = await prisma.celebrationHero.create({ data: DEFAULT_ROW });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('[celebration-hero GET]', error);
    res.status(500).json({ success: false, message: 'Error fetching celebration hero' });
  }
};

const updateOne = async (req, res) => {
  try {
    const b = req.body;
    const existing = await prisma.celebrationHero.findUnique({ where: { id: DEFAULT_ID } });

    const toDelete = [];
    if (existing) {
      const d1 = queueCloudinaryDelete(
        existing.mainPublicId,
        b.mainPublicId,
        b.mainImageUrl
      );
      const d2 = queueCloudinaryDelete(
        existing.secondaryLeftPublicId,
        b.secondaryLeftPublicId,
        b.secondaryLeftUrl
      );
      const d3 = queueCloudinaryDelete(
        existing.secondaryRightPublicId,
        b.secondaryRightPublicId,
        b.secondaryRightUrl
      );
      if (d1) toDelete.push(d1);
      if (d2) toDelete.push(d2);
      if (d3) toDelete.push(d3);
    }

    const base = existing || DEFAULT_ROW;

    const update = {};
    if (b.eyebrow !== undefined) update.eyebrow = b.eyebrow;
    if (b.title !== undefined) update.title = b.title;
    if (b.subtitle !== undefined) update.subtitle = b.subtitle;
    if (b.mainImageUrl !== undefined) update.mainImageUrl = b.mainImageUrl || null;
    if (b.mainPublicId !== undefined) update.mainPublicId = b.mainPublicId || null;
    if (b.secondaryLeftUrl !== undefined) update.secondaryLeftUrl = b.secondaryLeftUrl || null;
    if (b.secondaryLeftPublicId !== undefined) {
      update.secondaryLeftPublicId = b.secondaryLeftPublicId || null;
    }
    if (b.secondaryRightUrl !== undefined) update.secondaryRightUrl = b.secondaryRightUrl || null;
    if (b.secondaryRightPublicId !== undefined) {
      update.secondaryRightPublicId = b.secondaryRightPublicId || null;
    }

    const next = await prisma.celebrationHero.upsert({
      where: { id: DEFAULT_ID },
      create: {
        id: DEFAULT_ID,
        eyebrow: b.eyebrow ?? base.eyebrow,
        title: b.title ?? base.title,
        subtitle: b.subtitle ?? base.subtitle,
        mainImageUrl:
          b.mainImageUrl !== undefined ? b.mainImageUrl || null : base.mainImageUrl,
        mainPublicId: b.mainPublicId !== undefined ? b.mainPublicId || null : base.mainPublicId,
        secondaryLeftUrl:
          b.secondaryLeftUrl !== undefined ? b.secondaryLeftUrl || null : base.secondaryLeftUrl,
        secondaryLeftPublicId:
          b.secondaryLeftPublicId !== undefined
            ? b.secondaryLeftPublicId || null
            : base.secondaryLeftPublicId,
        secondaryRightUrl:
          b.secondaryRightUrl !== undefined ? b.secondaryRightUrl || null : base.secondaryRightUrl,
        secondaryRightPublicId:
          b.secondaryRightPublicId !== undefined
            ? b.secondaryRightPublicId || null
            : base.secondaryRightPublicId,
      },
      update,
    });

    for (const pid of toDelete) {
      if (pid) await deleteImage(pid);
    }

    res.json({ success: true, data: next });
  } catch (error) {
    console.error('[celebration-hero PUT]', error);
    res.status(500).json({ success: false, message: 'Error updating celebration hero' });
  }
};

module.exports = { getOne, updateOne };
