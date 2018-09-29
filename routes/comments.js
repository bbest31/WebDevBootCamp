var express = require("express");
var router = express.Router({ mergeParams: true });
var World = require("../models/world");
var Comment = require("../models/comment");
var middleWare = require("../middleware");

// Comments - NEW
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    //find world by id
    World.findById(req.params.id, function(err, world) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { world: world });
        }
    })

});

// Comments- CREATE
router.post("/", middleWare.isLoggedIn, function(req, res) {
    World.findById(req.params.id, function(err, world) {
        if (err) {
            req.flash("error", "Something went wrong!")
            res.redirect("/worlds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Please log in first!")
                    console.log(err);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    world.comments.push(comment);
                    world.save();
                    req.flash("success", "Succesfully added comment!")
                    res.redirect("/worlds/" + world._id);
                }
            });
        }
    })

});


router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", { world_id: req.params.id, comment: foundComment });
        }
    })

});


router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect("/worlds/" + req.params.id)
        }
    });
});

router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        }
        else {
            req.flash("success", "Comment removed!")
            res.redirect("/worlds/" + req.params.id);
        }
    })
});

module.exports = router;
