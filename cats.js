var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//add a new cat to DB
// var Lucy = new Cat({
//     name: "Lucy",
//     age: 15,
//     temperament: "Tired"
// });

// Lucy.save(function(err, cat) {
//     if (err) {
//         console.log("Something went wrong");
//     }
//     else {
//         console.log("We saved a cat to the db");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Pumpkin",
    age: 7,
    temperament: "Hungry"
}, function(err, cat) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("ERROR");
        console.log(err);
    }
    else {
        console.log(cats);
    }
});
