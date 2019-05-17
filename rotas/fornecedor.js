const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/view', ensureAuthenticated, (req, res) => { 

    let query = "SELECT * FROM `fornecedor` ORDER BY id ASC"; // query database to get all the players
    // execute query
    con.query(query, (err, result) => {
        
        if (err) {
            res.redirect('/users/login');
        }
        
        res.render('fornecedor', {
            listaFornecedor: result,
            title: 'CRUD ',
            usuario: userDisplay
        });
    });
           
});

router.get('/delete/:id', (req, res)=>{
    const fornecedorId = req.params.id;
        let deleteQuery = "DELETE FROM fornecedor WHERE id='"+fornecedorId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ fornecedorId);
            res.redirect('/fornecedor/view');
        })
});

router.post('/register', (req, res) => {
    
    let registerQuery = 'INSERT INTO fornecedor(empresa,endereco,cidade,uf,cnpj,telefone,email) VALUE ?';
    const {empresa,endereco,cidade,uf,cnpj,telefone,email} = req.body;
        
        const values = [[empresa, endereco, cidade, uf, cnpj,telefone, email]];
            con.query(registerQuery, [values], function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Adicionou registro!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/fornecedor/view');
                }
           });
   

});

router.post('/update', (req, res) => {
    
    let registerQuery = 'Update fornecedor '+ 
                        'SET '+
                        'empresa = ?,'+
                        'endereco = ?,'+
                        'cidade = ?,'+
                        'uf = ?,'+
                        'cnpj = ?,'+
                        'telefone = ?,'+
                        'email = ? '+
                        'WHERE id = ?';

    const {id, empresa,endereco,cidade,uf,cnpj,telefone,email} = req.body;
        
    console.log(id);
        const values = [empresa,endereco,cidade,uf,cnpj,telefone,email, Number(id)];
            con.query(registerQuery, values, function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Registro Editado!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/fornecedor/view');
                }
           });
   

});
module.exports = router;

/*

    */