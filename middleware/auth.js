const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

const isLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    } 
    return next();
};

module.exports = { isLoggedIn, isLoggedOut };