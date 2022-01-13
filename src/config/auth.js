const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
        User.selectUserbyEmailLogin(email).then((user) => {

            if (Object.keys(user).length === 0) {   
                return done(null, false);
            }
            
            for (var prop in user) {
                passwordUser = user[prop].password
            }
            
            const res = bcrypt.compare(password, passwordUser, (err, resp) => {
                if (resp) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
                
            })
        });
    }));
    
    passport.serializeUser((user, done) => {

        for (var prop in user) {
            idUser = user[prop].id
        }
        done(null, idUser);
    });

    passport.deserializeUser((id, done) => {
        
        User.selectUserDeserializeLogin(id).then((res) => {
            if (!res) {
                return done(null, false);
                
            } else {
                done(null, res);
            }
        });
    });
}