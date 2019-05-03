const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const connection = require('./bdConnection');
const {getHomePage} = require('./rotas/index');
const {addPessoa, deletePessoa} = require('./rotas/pessoa');
var session = require('express-session');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true}));

app.set('views' , path.join(__dirname, 'views'));

app.set('view engine','pug');

app.use(bodyParser.json());

app.listen(3000,function() {
    console.log('server running on port 3000')
});


app.get('/', function(request, response) {
	response.render('login.pug');
});

app.post('/auth', function(request, response) {
	const username = request.body.username;
    const password = request.body.password;
    
    let authQuery = 'SELECT * FROM usuario WHERE username = ? AND senha = ?';
    const values = [[username,password]];

	if (username && password) {
		con.query(authQuery, [username,password], function(error, results, fields) {
            console.log(results.length);
            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Usuário ou senha incorretos');
			}			
			response.end();
		});
	} else {
		response.send('Entre com usuário e senha!');
		response.end();
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', getHomePage);
app.post('/add', addPessoa)
app.get('/delete/:id', deletePessoa);
//app.get('',(req,res) => {
//   res.render('index')
//});




