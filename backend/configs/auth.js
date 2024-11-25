import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express';
import User from '../models/User.js'; 

const router = express.Router(); 

passport.use(new GoogleStrategy({
    clientID: 'aaa', 
    clientSecret: 'aaa', 
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            });
        }
        done(null, user); 
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser ((user, done) => {
    done(null, user.id); 
});


passport.deserializeUser (async (id, done) => {
    try {
        const user = await User.findByPk(id); 
        done(null, user); 
    } catch (error) {
        done(error, null);
    }
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/home');
    }
);

export default router; 