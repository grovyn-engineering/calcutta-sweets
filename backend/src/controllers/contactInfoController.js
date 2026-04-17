const { prisma } = require('../lib/prisma');
const { deleteImage } = require('../utils/cloudinary');

function nullIfEmpty(v) {
  if (v === undefined) return undefined;
  if (v === null) return null;
  if (typeof v === 'string' && v.trim() === '') return null;
  return v;
}

const getOne = async (req, res) => {
  try {
    const data = await prisma.contactInfo.findFirst();
    res.json({ success: true, data: data || null });
  } catch (error) {
    console.error('[contact GET]', error);
    res.status(500).json({ success: false, message: "Error fetching" });
  }
};

const updateOne = async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.visitWelcomeHeading === 'string') {
      body.visitWelcomeHeading = body.visitWelcomeHeading.replace(/\\n/g, '\n');
    }
    const existing = await prisma.contactInfo.findFirst();

    let oldHeroPublicIdToDelete = null;
    if (existing?.visitHeroPublicId) {
      const next = body.visitHeroPublicId;
      if (next !== undefined && next !== existing.visitHeroPublicId) {
        oldHeroPublicIdToDelete = existing.visitHeroPublicId;
      } else if (next === '' && existing.visitHeroPublicId) {
        oldHeroPublicIdToDelete = existing.visitHeroPublicId;
      }
    }

    let oldOwnerPublicIdToDelete = null;
    if (existing?.visitOwnerPublicId) {
      const next = body.visitOwnerPublicId;
      if (next !== undefined && next !== existing.visitOwnerPublicId) {
        oldOwnerPublicIdToDelete = existing.visitOwnerPublicId;
      } else if (next === '' && existing.visitOwnerPublicId) {
        oldOwnerPublicIdToDelete = existing.visitOwnerPublicId;
      }
    }

    const visitData = (base) => ({
      visitHeroImageUrl:
        body.visitHeroImageUrl !== undefined
          ? nullIfEmpty(body.visitHeroImageUrl)
          : base.visitHeroImageUrl,
      visitHeroPublicId:
        body.visitHeroPublicId !== undefined ? body.visitHeroPublicId || null : base.visitHeroPublicId,
      visitHeroEyebrow:
        body.visitHeroEyebrow !== undefined ? nullIfEmpty(body.visitHeroEyebrow) : base.visitHeroEyebrow,
      visitHeroTitle:
        body.visitHeroTitle !== undefined ? nullIfEmpty(body.visitHeroTitle) : base.visitHeroTitle,
      visitHeroDescription:
        body.visitHeroDescription !== undefined
          ? nullIfEmpty(body.visitHeroDescription)
          : base.visitHeroDescription,
      visitDirectionsUrl:
        body.visitDirectionsUrl !== undefined
          ? nullIfEmpty(body.visitDirectionsUrl)
          : base.visitDirectionsUrl,
      visitFeaturesHeading:
        body.visitFeaturesHeading !== undefined
          ? nullIfEmpty(body.visitFeaturesHeading)
          : base.visitFeaturesHeading,
      visitFeaturesSubtitle:
        body.visitFeaturesSubtitle !== undefined
          ? nullIfEmpty(body.visitFeaturesSubtitle)
          : base.visitFeaturesSubtitle,
      visitWelcomeHeading:
        body.visitWelcomeHeading !== undefined
          ? nullIfEmpty(body.visitWelcomeHeading)
          : base.visitWelcomeHeading,
      visitWelcomeBody:
        body.visitWelcomeBody !== undefined ? nullIfEmpty(body.visitWelcomeBody) : base.visitWelcomeBody,
      visitOwnerName:
        body.visitOwnerName !== undefined ? nullIfEmpty(body.visitOwnerName) : base.visitOwnerName,
      visitOwnerRole:
        body.visitOwnerRole !== undefined ? nullIfEmpty(body.visitOwnerRole) : base.visitOwnerRole,
      visitOwnerImageUrl:
        body.visitOwnerImageUrl !== undefined
          ? nullIfEmpty(body.visitOwnerImageUrl)
          : base.visitOwnerImageUrl,
      visitOwnerPublicId:
        body.visitOwnerPublicId !== undefined
          ? body.visitOwnerPublicId || null
          : base.visitOwnerPublicId,
      visitWelcomeLocationLine:
        body.visitWelcomeLocationLine !== undefined
          ? nullIfEmpty(body.visitWelcomeLocationLine)
          : base.visitWelcomeLocationLine,
      visitWelcomeHoursLine:
        body.visitWelcomeHoursLine !== undefined
          ? nullIfEmpty(body.visitWelcomeHoursLine)
          : base.visitWelcomeHoursLine,
    });

    if (existing) {
      const updated = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: {
          address: body.address,
          phone: body.phone,
          email: body.email,
          description: body.description ?? '',
          hours: body.hours !== undefined ? body.hours : existing.hours,
          ...visitData(existing),
        },
      });
      if (oldHeroPublicIdToDelete) await deleteImage(oldHeroPublicIdToDelete);
      if (oldOwnerPublicIdToDelete) await deleteImage(oldOwnerPublicIdToDelete);
      return res.json({ success: true, data: updated });
    }

    const defaults = {
      visitHeroImageUrl: null,
      visitHeroPublicId: null,
      visitHeroEyebrow: null,
      visitHeroTitle: null,
      visitHeroDescription: null,
      visitDirectionsUrl: null,
      visitFeaturesHeading: null,
      visitFeaturesSubtitle: null,
      visitWelcomeHeading: null,
      visitWelcomeBody: null,
      visitOwnerName: null,
      visitOwnerRole: null,
      visitOwnerImageUrl: null,
      visitOwnerPublicId: null,
      visitWelcomeLocationLine: null,
      visitWelcomeHoursLine: null,
    };
    const created = await prisma.contactInfo.create({
      data: {
        address: body.address,
        phone: body.phone,
        email: body.email,
        description: body.description || '',
        hours: body.hours ?? null,
        ...visitData(defaults),
      },
    });
    res.json({ success: true, data: created });
  } catch (error) {
    console.error('[contact PUT]', error);
    const msg = String(error.message || '');
    const missingColumn =
      error.code === 'P2022' || /column .* does not exist/i.test(msg) || /Unknown column/i.test(msg);
    const payload = {
      success: false,
      message:
        process.env.NODE_ENV !== 'production'
          ? msg || 'Error updating'
          : 'Error updating',
      ...(process.env.NODE_ENV !== 'production' && error.code ? { code: error.code } : {}),
    };
    if (missingColumn) {
      payload.hint =
        'Apply pending migrations from the backend folder: npx prisma migrate deploy';
    }
    res.status(500).json(payload);
  }
};

module.exports = { getOne, updateOne };
