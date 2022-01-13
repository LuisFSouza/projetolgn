const passport = require('passport');

module.exports = {

    async renderViewLogin(req, res) {
        msg = {msg: req.session.messages}
        req.session.messages = undefined;
        res.render('login', msg );
        
    },

    async login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: "/users",
            failureRedirect: "/login",
            failureMessage: "Email ou senha inválidos" 
        })(req, res, next);
    },

    logout(req, res){
        req.logout()
        res.redirect('/login')
    }
}