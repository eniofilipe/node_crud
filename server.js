const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./bdConnection');
const {getDash} = require('./rotas/dashboard');
const {addPessoa, deletePessoa} = require('./rotas/pessoa');
var session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

app.set('view engine','pug');

//body parser
app.use(bodyParser.urlencoded({ extended: true}));

// Express Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) =>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.condErro = false;
	res.locals.error = req.flash('error');
	next();
})
global.userDisplay = '';


app.use(express.static(path.join(__dirname, 'public')));
app.set('views' , path.join(__dirname, 'views'));


app.use('/', require('./rotas/index.js'));
app.use('/users', require('./rotas/users.js'));
app.use('/dashboard', require('./rotas/dashboard.js'));
//app.post('/auth', function(request, response) {
//	const username = request.body.username;
//    const password = request.body.password;
//    
//    
//});



//app.get('/logout', function (req, res) {
//	req.session.destroy();
//	res.redirect('/');
//});	

//app.get('/dash', getDash);
//app.post('/add', addPessoa)
//app.get('/delete/:id', deletePessoa);
//app.get('',(req,res) => {
//   res.render('index')
//});


app.listen(3000,function() {
    console.log('server running on port 3000')
});

