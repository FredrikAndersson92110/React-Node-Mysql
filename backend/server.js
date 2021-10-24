const express = require("express"); 
const mysql = require("mysql"); 
const cors = require("cors"); 
const path = require("path");

// User 
const Users = require("./routes/Users");

const app = express(); 

app.use(cors({origin: "*"})); 

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

// Connect to DB 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysqlgithubdb"
});

db.connect((err) => {
    if (err) throw err; 
    console.log("Connected!");
});

// Allow user to visit these paths 
app.use("/images", express.static(path.join(__dirname, "images"))); 
app.use("/", express.static(path.join(__dirname, "react"))); 

// API 
app.use("/api/users", Users); 



// PORT 
const port = process.env.PORT || 4000;
// run the serfver 
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


