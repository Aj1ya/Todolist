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

// Add this route before your existing app.post("/") route
app.delete("/delete/:index", (req, res) => {
    const index = req.params.index;

    // Determine the list based on the request
    const targetList = req.body.list === "work" ? workItems : items;

    // Check if the index is valid
    if (index >= 0 && index < targetList.length) {
        // Remove the item at the specified index
        targetList.splice(index, 1);

        // Respond with success
        res.json({ success: true });
    } else {
        // Respond with an error if the index is invalid
        res.json({ success: false, error: "Invalid index" });
    }
});

app.get("/", (req, res)=>{

    let day = date.getDate();
   
    res.render( "list", {listTitle: day, newListItems:items} );

});

app.post("/", (req, res)=>{
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




