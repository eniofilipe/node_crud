module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `nomes` ORDER BY id ASC"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {
            if (err) {
                res.redirect('/home');
            }
            res.render('index', {
                title: 'Crud Nodejs with mySql | View Peoples'
                ,pessoas: result,
                usuario: req.session.username
            });
        });
    },
};
