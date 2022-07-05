const express           = require('express');
const session           = require('express-session');
const router            = express.Router();
const passport          = require('passport');
const { isLoggedIn }    = require('../middleware/auth');
const { getModel }      = require('./db');   
const passportInit      = require('./config/passport.config');                     

router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));
router.use(session({ secret: '123', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

const db = getModel();
passportInit(db);

router.get('/', isLoggedIn, (req, res) => {
    res.render('index');
});

module.exports = router;