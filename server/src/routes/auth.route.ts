import express from 'express';
import passport from '../config/passport';
import asyncHandler from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import jwt from 'jsonwebtoken';

const router = express.Router();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${frontendUrl}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect(`${frontendUrl}/`);
  },
);

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      throw new ApiError(401, 'Not authenticated');
    }
  }),
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  }),
);

export default router;
