// server.js
require('dotenv').config();

console.log("--- Environment Check ---");
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET ? "YES" : "NO");
console.log("DB URL Loaded:", process.env.DATABASE_URL ? "YES" : "NO");
console.log("-------------------------");

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cloudinary = require('cloudinary').v2;

const { prisma } = require('./src/lib/prisma');
const { login, logout, me } = require('./src/controllers/authController');
const { protect } = require('./src/middlewares/authMiddleware');
const { errorHandler } = require('./src/middlewares/errorHandler');

const heroRoutes = require('./src/routes/heroRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim()) 
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

//Routes 

app.use('/api/hero', heroRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/occasions', require('./src/routes/occasionRoutes'));
app.use('/api/signature-sweets', require('./src/routes/signatureSweetRoutes'));
app.use('/api/wedding-stats', require('./src/routes/weddingStatRoutes'));
app.use('/api/contact', require('./src/routes/contactInfoRoutes'));
app.use('/api/story', require('./src/routes/storyRoutes'));
app.use('/api/special-orders', require('./src/routes/specialOrderRoutes'));
app.use('/api/timeline-events', require('./src/routes/timelineEventRoutes'));
app.use('/api/testimonials', require('./src/routes/testimonialRoutes'));
app.use('/api/visit-us-stats', require('./src/routes/visitUsStatRoutes'));
app.use('/api/celebration-process', require('./src/routes/celebrationProcessRoutes'));
app.use('/api/menu-products', require('./src/routes/menuProductRoutes'));
app.use('/api/visit-us-features', require('./src/routes/visitUsFeatureRoutes'));

const { validate } = require('./src/middlewares/validate');
const { loginSchema } = require('./src/validators/schemas');

// Auth routes
app.post('/api/auth/login', loginLimiter, validate(loginSchema), login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/me', protect, me);

app.get('/api/admin/dashboard', protect, (req, res) => {
  res.json({ success: true, message: `Welcome back, ${req.admin.email}!` });
});

app.get('/api/admin/stats', protect, async (req, res) => {
  try {
    const [
      heroSlides,
      occasions,
      signatureSweets,
      weddingStats,
      timelineEvents,
      stories,
      contacts,
      specialOrders,
      testimonials,
      visitUsStats,
      celebrationSteps,
      menuProducts,
      visitUsFeatures,
    ] = await Promise.all([
      prisma.heroSection.count(),
      prisma.occasion.count(),
      prisma.signatureSweet.count(),
      prisma.weddingStat.count(),
      prisma.timelineEvent.count(),
      prisma.story.count(),
      prisma.contactInfo.count(),
      prisma.specialOrder.count(),
      prisma.testimonial.count(),
      prisma.visitUsStat.count(),
      prisma.celebrationProcessStep.count(),
      prisma.menuProduct.count(),
      prisma.visitUsFeature.count(),
    ]);
    res.json({
      success: true,
      data: {
        heroSlides,
        occasions,
        signatureSweets,
        weddingStats,
        timelineEvents,
        stories,
        contacts,
        specialOrders,
        testimonials,
        visitUsStats,
        celebrationSteps,
        menuProducts,
        visitUsFeatures,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Failed to load admin stats' });
  }
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, status: "Server is running smoothly! DB Connection: Alive" });
  } catch (error) {
    console.error("Health Check DB Error:", error);
    res.status(500).json({ success: false, status: "Server is running, but DB Connection failed" });
  }
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
