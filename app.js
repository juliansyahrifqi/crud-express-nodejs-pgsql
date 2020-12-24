const express = require("express");
const app = express();
const {Pool} = require("pg");

// Create connection to PostgreSQL 
const pool = new Pool({
    user: "eflkafjt",
    host: "satao.db.elephantsql.com",
    database: "eflkafjt",
    password: "lw67wRPOc2dX2TVv_sZEBIJh5rc0-lVU",
    port: 5432
});
console.log("Succesful Connection to the database");

// Serve static file
app.use(express.static("public"));

// Get value from form 
app.use(express.urlencoded({extended: false}));

// Node / Express Server
app.listen(3000, () => {
    console.log("Server started!");
});

// Get Data
app.get('/', (req, res) => {
    const sql = "SELECT * FROM Users";
    
    pool.query(sql, [], (err, result) => {
        if(err) {
            return console.log(err.message);
        }

        res.render("index.ejs", {users: result.rows});
    });
});


// Post (add) data 
app.post('/add', (req, res) => {

    const sqlInsert = "INSERT INTO Users (nama_user) VALUES ($1);";

    pool.query(sqlInsert, [req.body.nama], (err,results) => {
        if(err) {
            return console.log(err.message);
        }

        const sql = "SELECT SETVAL('Users_user_id_Seq', MAX(user_id)) FROM Users;";
        pool.query(sql, [], (err,results) => {
           if(err) {
               return console.log(err.message);
           }
        });

        res.redirect('/');        
    });
});

app.post('/delete/:id', (req, res) => {
    const sqlDelete = "DELETE FROM Users WHERE user_id = $1";

    pool.query(sqlDelete, [req.params.id], (err, result) => {
        if(err) {
            return console.log(err.message);
        }

        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM Users WHERE user_id = $1";

    pool.query(sql, [req.params.id], (err, result) => {
        if(err) {
            return console.log(err.message);
        }

        res.render('edit.ejs', {user: result.rows[0]});
    });
});

app.post('/update/:id', (req, res) => {
    const sql = "UPDATE Users SET nama_user = $1 WHERE user_id = $2";

    pool.query(sql, [req.body.nama, req.params.id], (err, result) => {
        if(err) {
            return console.log(err.message);
        }

        res.redirect('/');
    });
});

