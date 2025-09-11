const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

//Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/Agaya/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({email: profile.emails[0].value});
            if (user) {
                done(null, user); //มีผู้ใช้ในระบบแล้ว
            } else {
                const newUser = new User({
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    password: 'oauth'
                });
                await newUser.save();
                done(null, newUser);
            }
        } catch (err) {
            done(err, null);
        }
    }
));