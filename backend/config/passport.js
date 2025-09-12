const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

// For Debuggin
// console.log('Reading .env:', {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// });

//Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL //"/api/v1/Agaya/google/callback"
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null)
    }
});

module.exports = passport;