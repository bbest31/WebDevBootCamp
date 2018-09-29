var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var app = express();

mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIG
var marineSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Marine = mongoose.model("Marine", marineSchema);

//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/space_marines");
});

// INDEX ROUTE
app.get("/space_marines", function(req, res) {
    Marine.find({}, function(err, marines) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { marines: marines });
        }
    })
});

// NEW ROUTE
app.get("/space_marines/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/space_marines", function(req, res) {
    // create marine
    Marine.create(req.body.marine, function(err, newMarine) {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("/space_marines");
        }
    });
});

//SHOW ROUTE
app.get("/space_marines/:id", function(req, res) {
    Marine.findById(req.params.id, function(err, foundMarine) {
        if (err) {
            res.redirect("/space_marines");
        }
        else {
            res.render("show", { marine: foundMarine });
        }
    });
});

//EDIT ROUTE
app.get("space_marines/:id/edit", function(req, res) {
    Marine.findById(req.params.id, function(err, foundMarine) {
        if (err) {
            res.redirect("/space_marines");
        }
        else {
            res.render("edit", { marine: foundMarine });
        }
    });
});

//UPDATE ROUTE
app.put("/space_marines/:id", function(req, res) {
    Marine.findByIdAndUpdate(req.params.id, req.body.marine, function(err, updatedMarine) {
        if (err) {
            res.redirect("/space_marines");
        }
        else {
            res.redirect("/space_marines/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
app.delete("/space_marines/:id", function(req, res) {
    //destroy marine
    Marine.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/space_marines");
        }
        else {
            //redirect
            res.redirect("/space_marines");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started...");
});
