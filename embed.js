var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blod_demo");


//POST - title content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// USER - email name

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);



var Post = mongoose.model("Post", postSchema);


// var newUser = new User({
//     email: "rick@flair.edu",
//     name: "Nature Boy",

// });

// newUser.posts.push({
//     title: "Woooo!",
//     content: "Limousine riding!!!!"
// });

// newUser.save(function(err, user) {
//     if (err) {
//         console.log("ERROR")
//     }
//     else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Life",
//     content: "Shit sucks"
// });

// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//     }
// })


User.findOne({ name: "Nature Boy" }, function(err, user) {
    if (err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "How to be slick like Rick",
            content: "You can't...."
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        });
    }
});
