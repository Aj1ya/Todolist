// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];

let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res)=>{

    let day = date.getDate();
   
    res.render( "list", {listTitle: day, newListItems:items} );

});

app.post("/", (req, res)=>{
    console.log(req.body.list);
    let item = req.body.newItem;

    if( !(item == null || item == "") ){
        if( req.body.list === "work"){
            workItems.push( item );
            res.redirect("/work");
        }else{
            items.push( item );
            res.redirect("/");
        }
    }
  
});

app.get("/work", (req, res)=>{
    res.render("list", {listTitle: "work", newListItems: workItems});
});

app.get("/about", (req, res)=>{
    res.render("about");
});

app.listen(3000, (req, res)=>{
    console.log( "app started in 3000" );
});