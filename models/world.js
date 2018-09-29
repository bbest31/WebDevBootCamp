var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/imperial");

//Schema Setup
var worldSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var World = mongoose.model("World", worldSchema);

module.exports = World;
