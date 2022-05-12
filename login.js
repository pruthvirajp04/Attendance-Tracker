
const hostname = 'localhost';
const port = 3000;
const mysql = require ("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const res = require("express/lib/response");
const app = express();
app.use("/static",express.static("static"));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
});

connection.connect(function(error){
    if (error)  throw error
    else console.log("Connected with Student's database sucessfully...");
})
app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?", [username,password] ,function( error,results,field){
        if(results.length > 0) {
            res.redirect("/welcome");
        }
        else {
            res.redirect("/error");
        }
        res.end();
    })
    
})
app.get("/", function(req,res)
{
res.sendFile(__dirname + "/views/index.html");
});
app.get("/index1", function(req,res)
{
res.sendFile(__dirname + "/views/index1.html");
});
app.get("/welcome", function(req,res){
    res.sendFile(__dirname + "/views/welcome.html")
} )
app.get("/error", function(req,res){
    res.sendFile(__dirname + "/error.html")
} )
app.get("/theory", function(req,res){
    res.sendFile(__dirname + "/views/theory.html")
} )
app.get("/practical", function(req,res){
    res.sendFile(__dirname + "/views/practical.html")
} )
app.get("/general", function(req,res){
    res.sendFile(__dirname + "/views/general.html")
} )
 

app.get("/contact", function(req,res){
    res.sendFile(__dirname + "/views/contact.html")
} )



// app.listen(3000);
app.listen(port, () => console.log(`This app is listening on port http://${hostname}:${port}`));  