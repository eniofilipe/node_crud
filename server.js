const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const con = require('./bdConnection');
const {getHomePage} = require('./rotas/index');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views' , path.join(__dirname, 'views'));

app.set('view engine','pug');

app.use(bodyParser.json());
app.listen(3000,function() {
    console.log('server running on port 3000')
});



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', getHomePage);

//app.get('',(req,res) => {
//   res.render('index')
//});



app.post('/', (req, res) => {
    console.log('Nome: '+req.body.name)
    console.log('Idade: '+req.body.age)
    con.inserir(req.body.name,req.body.age)
});

