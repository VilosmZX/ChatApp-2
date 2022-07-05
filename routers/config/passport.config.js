const passport      = require('passport');
const LocalStorage  = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

module.exports = function (db) {
    passport.use(new LocalStorage({usernameField: 'email'}, 
    async (email, password, done) => {
        try {
            db.findOne({email}, async (err, user) => {
                if(err) return done(err);
                if(!user) return done(null, false, { message: 'Email salah!' });
                if(await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Password salah!' });
            });
        } catch(err) {
            return done(err);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.findById(id, (err, user) => {
            done(null, user);
        });
    });
};