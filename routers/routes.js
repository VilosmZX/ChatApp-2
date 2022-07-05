const express           = require('express');
const session           = require('express-session');
const router            = express.Router();
const passport          = require('passport');
const { isLoggedIn, isLoggedOut }    = require('../middleware/auth');
const { getModel }      = require('./db');   
const passportInit      = require('./config/passport.config');
const bcrypt            = require('bcrypt');                     

const db = getModel();
passportInit(db);
router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));
router.use(session({ secret: '123', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());



router.get('/', isLoggedIn, (req, res) => {
    res.render('index', {req});
});

router.get('/login', isLoggedOut, (req, res) => {
    res.render('login');
});

router.post('/login', isLoggedOut, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/register', isLoggedOut, (req, res) => res.render('register'));

router.post('/register', isLoggedOut, async (req, res) => {
    const generateHashKey = async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    };
    const credentials = {
        email: req.body.email,
        username: req.body.username,
        password: await generateHashKey(req.body.password),
    };
    const user = new db(credentials);
    await user.save();
    res.redirect('/login');
});

module.exports = router;