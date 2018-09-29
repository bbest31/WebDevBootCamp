var World = require("../models/world");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "Comment not found!")
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "Permission denied!")
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "Please log in first!")
        res.redirect("back");
    }
}

middlewareObj.checkWorldOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        World.findById(req.params.id, function(err, foundWorld) {
            if (err) {
                req.flash("error", "World not found!");
                res.redirect("back");
            }
            else {
                if (foundWorld.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "Permission denied!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "Please log in first!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in first.");
    res.redirect("/login");
}

module.exports = middlewareObj
