const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/view', ensureAuthenticated, (req, res) => { 

    let query = "SELECT * FROM `produtos` ORDER BY id ASC"; // query database to get all the players
    // execute query
    con.query(query, (err, result) => {
        
        if (err) {
            res.redirect('/users/login');
        }
        

        res.render('produtos', {
            tabela: result,
            title: 'CRUD ',
            usuario: userDisplay
        });
    });
           
});

router.get('/delete/:id', (req, res)=>{
    const produtoId = req.params.id;
        let deleteQuery = "DELETE FROM produtos WHERE id='"+produtoId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ produtoId);
            res.redirect('/produtos/view');
        })
});

router.post('/register', (req, res) => {
    
    let registerQuery = 'INSERT INTO produtos(nome,preco,quantidade,descricao) VALUE ?';
    const {nome, descricao,preco,quantidade} = req.body;
        
        const values = [[nome, preco, quantidade, descricao]];
            con.query(registerQuery, [values], function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Adicionou registro!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/produtos/view');
                }
           });
   

});

router.post('/update', (req, res) => {
    
    let registerQuery = 'Update produtos '+ 
                        'SET '+
                        'nome = ?,'+
                        'descricao = ?,'+
                        'preco = ?,'+
                        'quantidade = ? '+
                        'WHERE id = ?';

    const {id, nome, descricao, preco, quantidade} = req.body;
        
    

    console.log(id);
        const values = [nome,descricao,preco,quantidade, Number(id)];
            con.query(registerQuery, values, function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Registro Editado!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/produtos/view');
                }
           });
   

});
module.exports = router;

/*

    */