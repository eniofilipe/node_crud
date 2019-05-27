const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  
  const upload = multer({
    dest: "./public/images/upload_files"
        // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

router.get('/view', ensureAuthenticated, (req, res) => { 

    let query = "SELECT * FROM `funcionarios` ORDER BY id ASC"; // query database to get all the players
    // execute query
    con.query(query, (err, result) => {
        
        if (err) {
            res.redirect('/users/login');
        }
        

        res.render('funcionarios', {
            tabela: result,
            title: 'CRUD ',
            usuario: userDisplay
        });
    });
           
});

router.get('/delete/:id', (req, res)=>{
    const funcionarioId = req.params.id;
        
        let deleteQuery = "DELETE FROM funcionarios WHERE id='"+funcionarioId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ funcionarioId);
            res.redirect('/funcionarios/view');
        })
});

router.post('/register', upload.single('photo'), (req, res) => {
    
    let registerQuery = 'INSERT INTO funcionarios(nome,telefone,nascimento,cargo, imagem) VALUE ?';
    const {nome, telefone, nascimento, cargo} = req.body;

    var parts = nascimento.split('/');
    var dataNasc = new Date(parts[2],parts[1]-1,parts[0]);

    const old = req.file.path;
    const imageName = req.file.originalname;
    const newPath ='./public/images/upload_files/';
    const namePath = newPath + imageName;
            if(req.file){

                fs.rename(old, namePath, function(err){
                    if(err){
                        console.log('Err: ',err);
                        res.end('Erro ao mover imagem!');
                    }
                    var msg = imageName + " salva em: " + newPath;
                    console.log(msg);

                    const values = [[nome, telefone, dataNasc, cargo,imageName]];
                    con.query(registerQuery, [values], function(error, result, fields){
                    if(error){
                        return console.log(error);
                    }else{
                        console.log('Adicionou registro!');
                        req.flash('success_msg', 'Registro adicionado com sucesso!');
                        res.redirect('/funcionarios/view');
                    }
                    });

                });


                



            }else throw 'error';
            

            
});

router.post('/update', function(req, res){

    
    upload.single('editPhoto')(req,res,function(err){
        
        let registerQuery = 'Update funcionarios '+ 
                            'SET '+
                            'nome = ?,'+
                            'telefone = ?,'+
                            'nascimento = ?,'+
                            'imagem = ?, '+
                            'cargo = ? ' +
                            'WHERE id = ?';



        const {id,nome, telefone, nascimento, cargo} = req.body;
        var parts = nascimento.split('/');
        var dataNasc = new Date(parts[2],parts[1]-1,parts[0]);

        const old = req.file.path;
        const imageName = req.file.originalname;
        const newPath ='./public/images/upload_files/';
        const namePath = newPath + imageName;
                if(req.file){

                    fs.rename(old, namePath, function(err){
                        if(err){
                            console.log('Err: ',err);
                            res.end('Erro ao mover imagem!');
                        }
                        var msg = imageName + " salva em: " + newPath;
                        console.log(msg);
                        console.log(id);
                        console.log(Number(id));
                        const values = [nome,telefone, dataNasc, imageName, cargo, Number(id)];
                            con.query(registerQuery, values, function(error, result, fields){
                                if(error){
                                    return console.log(error)
                                }else{
                                    console.log('Registro Editado!');
                                    req.flash('success_msg', 'Registro adicionado com sucesso!');
                                    res.redirect('/funcionarios/view');
                                }
                        });

                    });


                    



                }else throw 'error';

    });
     

});

module.exports = router;

/*

    */