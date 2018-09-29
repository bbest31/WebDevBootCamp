var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleWare = require("../middleware");


router.get("/", function(req, res) {
    res.render("landing");
});


// AUTH ROUTES

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err)
            res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("worlds");
        });

    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/worlds",
    failureRedirect: "/login"
}), function(req, res) {

});

router.get("/logout", function(req, res) {
    req.logout();
    res.flash("success", "Logged you out!");
    res.redirect("/worlds");
});

module.exports = router;
