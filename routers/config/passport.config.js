const passport      = require('passport');
const LocalStorage  = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

module.exports = function (db) {
    passport.use(new LocalStorage({usernameField: 'email'}, 
    async (email, password, done) => {
        try {
            const user = db.exists({ email });
            if(!user) return done(null, false, { message: 'User tidak ditemukan' });
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            return done(null, false, { message: 'Password salah!' });
        } catch(err) {
            return done(err);
        }
    }));
};