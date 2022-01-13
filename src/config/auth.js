const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
        User.selectUserByEmail(email).then((user) => {

            if (Object.keys(user).length === 0) {   
                return done(null, false);
            }
            
            const res = bcrypt.compare(password, user[0]['password'], (err, resp) => {
                if (resp) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                
            })
        });
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user[0]['id']);
    });

    passport.deserializeUser((id, done) => {
        User.selectUserById(id).then((res) => {
            if (!res) {
                return done(null, false);
                
            } else {
                done(null, res);
            }
        });
    });
}