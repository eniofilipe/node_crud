const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

/*router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        usuario: req.user
    })
);
*/

module.exports = router;