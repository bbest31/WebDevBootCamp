var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "I hate you human"
    }

    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:message/:number", function(req, res) {
    var n = Number(req.params.number);
    var msg = req.params.message;
    var output = "";
    for (var i = 0; i < n; i++) {
        output += msg + " ";
    }
    res.send(output);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
})

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started...");
});
