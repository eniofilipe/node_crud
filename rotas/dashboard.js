const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/home', ensureAuthenticated, (req, res) => {
    let query = "SELECT * FROM `nomes` ORDER BY id ASC"; // query database to get all the players
    // execute query
    con.query(query, (err, result) => {
        
        if (err) {
            res.redirect('/users/login');
        }
        res.render('dashboard', {
            title: 'Crud Nodejs with mySql | View Peoples',
            pessoas: result,
            usuario: userDisplay
        });
    });       
});

module.exports = router;