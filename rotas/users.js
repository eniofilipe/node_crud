const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, (req,res) => res.render('login'));

router.get('/register', forwardAuthenticated, (req, res) => res.render('registroUsuario'));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard/home',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});

router.post('/register', (req, res ) =>{
    
    let registerQuery = 'INSERT INTO usuario(username, email, senha) VALUES ?';
    const {username, email, password} = req.body;

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password, salt, (err, hash)=> {
            if(err) throw err;
            const values = [username,email,hash];
            con.query(registerQuery, [values], function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Adicionou registro!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                }
           });
        })
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você saiu do sistema!');
    res.redirect('/users/login');
});

module.exports = router;