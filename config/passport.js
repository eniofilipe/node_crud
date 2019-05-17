const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');



module.exports = function(passport){

    var resultado;
    passport.use(new LocalStrategy(
        function(email, password, done) {
         
            let authQuery = 'SELECT * FROM usuario WHERE email = ?';

            con.query(authQuery,[email], function(error,results, fields){
                resultado = results[0];
                
                if(results.length>0){

                    /*if(password==resultado.senha){
                        
                        return done(null, resultado);
                    }else{
                        return done(null, false, {message: 'Senha incorreta!'});
                    }*/
                    bcrypt.compare(password, resultado.senha, (err, isMatch)=> {
                        if(err) throw err;
                        if(isMatch){
                            userDisplay = resultado.username;
                            return done(null,resultado);
                        } else {
                            return done(null, false, {message: 'Senha incorreta!'});
                        }
                    });

                }else{
                    return done(null, false, { message: 'Email não registrado!'});
                }
            });
        }
      ));

    passport.serializeUser(function(resultado,done){
        done(null, resultado.id);
    });
    
    passport.deserializeUser(function(id,done){

        let authQuery = 'SELECT * FROM usuario WHERE id = ?';

        con.query(authQuery,[id], function(error,result ){
            done(error, result);        
        })
    });  

};


