var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var Post = require("./models/post");

var User = require("./models/user");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bobby Boy"
// });

// Post.create({
//     title: "Im not a murderer",
//     content: "But I think about it"
// });

// Post.create({
//     title: "Im not a murderer pt. 2",
//     content: "I'd do it"
// }, function(err, post) {
//     User.findOne({ email: "bob@gmail.com" }, function(err, user) {
//         if (!err) {
//             user.posts.push(post);
//             user.save(function(err, data) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

//Finds a user and gets all their posts with them
// User.findOne({ email: "bob@gmail.com" }).populate("posts").exec(function(err, user) {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(user);
//     }
// });
