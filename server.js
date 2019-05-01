const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const con = require('./conBd')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000,function() {
    console.log('server running on port 3000')
})

app.get('/',(req,res) => {
    res.render('index.ejs')
})

app.set('view engine','ejs')

app.post('/show', (req, res) => {
    console.log('Nome: '+req.body.name)
    console.log('Idade: '+req.body.age)
    con.inserir(req.body.name,req.body.age)
})

