const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'banco_node'
});

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
});

exports.inserir = function(nome, idade){
    const sql = "INSERT INTO nomes(nome, idade) VALUES ?";
    const values = [[nome,idade]];

    connection.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Adicionou registro!');
        connection.end();
    });
}
