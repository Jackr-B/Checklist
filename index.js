var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

var taskRoutes  = require("./routes/tasks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res){
    res.sendfile("index.html");
});

app.use("/api/tasks", taskRoutes);

app.listen(3000, function(){
    console.log("Server running on port 3000")
})