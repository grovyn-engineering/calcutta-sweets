const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function tokenCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  };
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, tokenCookieOptions());

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: admin.id,
          email: admin.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', tokenCookieOptions());
  res.json({ success: true, message: 'Logged out successfully' });
};

const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    
    const admin = await prisma.admin.findUnique({ where: { id: req.user.id } });
    if (!admin) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: {
        user: {
          id: admin.id,
          email: admin.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { login, logout, me };