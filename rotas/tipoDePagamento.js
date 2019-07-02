const express = require('express');
const router = express.Router();

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/view', ensureAuthenticated, (req, res) => { 

    let query = "SELECT * FROM `pagamento` ORDER BY idpagamento ASC"; // query database to get all the players
    // execute query
    con.query(query, (err, result) => {
        
        if (err) {
            res.redirect('/users/login');
        }
        
        res.render('tipoDePagamento', {
            listaPagamentos: result,
            usuario: userDisplay
        });
    });
           
});

router.get('/delete/:id', (req, res)=>{
    const pagamentoId = req.params.id;
        let deleteQuery = "DELETE FROM pagamento WHERE idpagamento='"+pagamentoId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ pagamentoId);
            res.redirect('/pagamento/view');
        })
});

router.post('/register', (req, res) => {
    
    let registerQuery = 'INSERT INTO pagamento(descricao,parcelas) VALUE ?';
    const {descricao,parcelas} = req.body;
        
        const values = [[descricao,Number(parcelas)]];
            con.query(registerQuery, [values], function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Adicionou registro!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/pagamento/view');
                }
           });
   

});

router.post('/update', (req, res) => {
    
    let registerQuery = 'Update pagamento '+ 
                        'SET '+
                        'descricao = ?,'+
                        'parcelas = ? '+
                        'WHERE idpagamento = ?';

    const {id, descricao, parcelas} = req.body;
        
    console.log(id);
        const values = [descricao,Number(parcelas), Number(id)];
            con.query(registerQuery, values, function(error, result, fields){
                if(error){
                    return console.log(error)
                }else{
                    console.log('Registro Editado!');
                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                    res.redirect('/pagamento/view');
                }
           });
   

});
module.exports = router;

/*

    */