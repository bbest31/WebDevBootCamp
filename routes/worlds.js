var express = require("express");
var router = express.Router();
var World = require("../models/world");
var middleWare = require("../middleware");



// Worlds - Index
router.get("/", function(req, res) {
    World.find({}, function(err, allWorlds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("worlds/index", { worlds: allWorlds, currentUser: req.user });
        }
    })
    //res.render("worlds", { worlds: worlds });
});

// CREATE
router.post("/", middleWare.isLoggedIn, function(req, res) {
    //get data from form and add to worlds array and redirect
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = { id: req.user._id, username: req.user.username };
    var newWorld = { name: name, image: image, desc: desc, author: author };
    World.create(newWorld, function(err, world) {
        if (err) {
            console.log(err);
        }
        else {

            console.log("New World Recorded");
            res.redirect("/worlds");
        }
    })

});

//NEW
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    res.render("worlds/new.ejs");
});

//SHOW
router.get("/:id", function(req, res) {

    World.findById(req.params.id).populate("comments").exec(function(err, foundWorld) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("worlds/show", { world: foundWorld });
        }
    });

});

// EDIT ROUTE
router.get("/:id/edit", middleWare.checkWorldOwnership, function(req, res) {
    World.findById(req.params.id, function(err, foundWorld) {
        res.render("worlds/edit", { world: foundWorld });
    });
});

// UPDATE ROUTE

router.put("/worlds/:id", middleWare.checkWorldOwnership, function(req, res) {

    World.findByIdAndUpdate(req.params.id, req.body.world, function(err, updatedWorld) {
        if (err) {
            res.redirect("/worlds");
        }
        else {
            res.redirect("/worlds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleWare.checkWorldOwnership, function(req, res) {
    World.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/worlds");
        }
        else {
            res.redirect("worlds")
        }
    });
});


module.exports = router;
