module.exports = {
   
    addPessoa: (req, res) => {

        const nome = req.body.name;
        const age = req.body.age;

        let addQuery = " INSERT INTO nomes(nome,idade) VALUES ? ";
        const values = [[nome,age]];

        con.query(addQuery, [values], function(error, result, fields){
            if(error){
                return console.log(error)
            }else{
                console.log('Adicionou registro!');
                res.redirect('/home');
            }
       });

        
    },

    deletePessoa: (req,res) => {
        const pessoaId = req.params.id;
        let deleteQuery = "DELETE FROM nomes WHERE id='"+pessoaId+"'";

        con.query(deleteQuery, (err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            console.log('Removeu registro '+ pessoaId);
            res.redirect('/home');
        })

    }

}