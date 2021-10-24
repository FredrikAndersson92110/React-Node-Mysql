const express = require("express"); 
const mysql = require("mysql"); 
const jwt = require("jsonwebtoken"); 

const router = express.Router(); 

// Database 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysqlgithubdb"
});

// Connect to DB 
db.connect((err) => {
    if (err) throw err; 
    console.log("Connected to database");
});


// --- Select or Create the Users table ---
function selectOrCreateTable() {
    db.query("SELECT * FROM users", (err, result, fields) => {
        if (err) {
            const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255) NOT NULL UNIQUE, picture VARCHAR(255), adress VARCHAR(255))";
            db.query(sql, (err, result) => {
                if (err) throw err;
            });
        }

    });
}
selectOrCreateTable();
//end

// --- Create new User ---
router.post("/register", async (req, res) => {
    const {email, password, name} = req.body.data;

    // const email = req.body.email; 
    // const password = req.body.pasword;
    // const name = req.body.name;

    db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
        if (err) {
            res.send({ err: "err" }); 
        }
        if (result.length === 0) {
            let sql = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
            db.query(sql, (err, result) => {
                if (err) throw err; 
                res.status(200).send({ result });
                console.log(result);
            });
        } else {
            return res.status(201).send({ message: "This email has allredy been used. "}); 
        }
    });
});
//end

// jsonwebtoken 
const jwtPrivateSecret = "FredrikReactNodeCourse"; 

// ---- Login User ---- 
router.post("/login", async (req, res) => {
    const { email, password} = req.body; 

    db.query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`, async (err, result) => {
        if (result.length !== 0) {
            jwt.sign({ userEmail: email }, jwtPrivateSecret, (err, token) => {
                res.status(200).send({ token: token });           
            })
        }
        if (result.length === 0) {
            res.status(400).send({ message: "Error; User not found"});
        }
    });
});
//end 



module.exports = router; 
