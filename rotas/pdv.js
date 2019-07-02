const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/view', ensureAuthenticated, (req, res) => { 
    
    let queryProdutos = "SELECT * FROM `produtos` ORDER BY id ASC"; // query database to get all the players
    let queryClientes = "SELECT * FROM `clientes` ORDER BY id ASC";
    let queryPagamentos = "SELECT * FROM `pagamento` ORDER BY idpagamento ASC";
    // execute query
    var resultadoPagamentos;
    var resultadoProdutos;
    con.query(queryPagamentos, (err,result) =>{
        resultadoPagamentos = result;
        con.query(queryProdutos, (err, result) => {
            resultadoProdutos=result;
            con.query(queryClientes, (err, result) => {
    
                res.render('pdv', {
                    tabelaClientes : result,
                    tabela: resultadoProdutos,
                    selecPagamentos: resultadoPagamentos,
                    usuario: userDisplay
                });
            
            });
            
        
        });
    });
    
    
    
        
   
           
});

router.post('/venda', (req, res) => {
    console.log(req.body);
});

/*router.get('/delete/:id', (req, res)=>{
    const clienteId = req.params.id;
        let deleteQuery = "DELETE FROM clientes WHERE id='"+clienteId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ clienteId);
            res.redirect('/clients/view');
        })
});

router.post('/register', (req, res) => {
    
    let registerQuery = 'INSERT INTO clientes(nome,endereco,bairro,cidade,uf,cep,cpf,rg,data_nascimento,tel_residencial,tel_celular) VALUE ?';
    const {nome, endereco, bairro,cidade, estado, cep, cpf, rg, nascimento, telRes, telCel} = req.body;
        
    var parts = nascimento.split('/');
    var dataNasc = new Date(parts[2],parts[1]-1,parts[0]);

        const values = [[nome, endereco, bairro,cidade, estado, cep, cpf, rg, dataNasc,telRes, telCel]];
            con.query(registerQuery, [values], function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Adicionou registro!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/clients/view');
                }
           });
   

});

router.post('/update', (req, res) => {
    
    let registerQuery = 'Update clientes '+ 
                        'SET '+
                        'nome = ?,'+
                        'endereco = ?,'+
                        'bairro = ?,'+
                        'cidade = ?,'+
                        'uf = ?,'+
                        'cep = ?,'+
                        'cpf = ?,'+
                        'rg = ?,'+
                        'data_nascimento = ?,'+
                        'tel_residencial = ?,'+
                        'tel_celular = ? '+
                        'WHERE id = ?';

    const {id, nome, endereco, bairro,cidade, estado, cep, cpf, rg, nascimento, telRes, telCel} = req.body;
        
    var parts = nascimento.split('/');
    var dataNasc = new Date(parts[2],parts[1]-1,parts[0]);

    console.log(id);
        const values = [nome, endereco, bairro,cidade, estado, cep, cpf, rg, dataNasc, telRes, telCel, Number(id)];
            con.query(registerQuery, values, function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Registro Editado!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/clients/view');
                }
           });
   

});*/
module.exports = router;

/*

    */