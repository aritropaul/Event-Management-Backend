var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express();

var contents = fs.readFileSync("data.json");
var events = JSON.parse(contents);

var contents2 = fs.readFileSync("contact.json");
var contacts = JSON.parse(contents2);

var numEvents = events["events"].length;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function(req,res){

    res.send('Events is working');

})

app.post('/events/new', function(req, res){
   {
        let id = req.body.id;
        let name = req.body.name;
        let date = req.body.date;
        let desc = req.body.desc;
        let venue = req.body.venue;
        events["events"][numEvents] = {}
        events["events"][numEvents]["id"] = id;
        events["events"][numEvents]["name"] = name;
        events["events"][numEvents]["date"] = date;
        events["events"][numEvents]["desc"] = desc;
        events["events"][numEvents]["venue"] = venue;
        var json = JSON.stringify(events);
        fs.writeFile('data.json', json, 'utf8', function(err){
            if (err) throw err;
            console.log('complete');
            numEvents++;
        });
        res.send("Event added.");
        
   }
});


app.post('/events/id', function(req, res){
    let id = req.body.id;
    let flag = 0;
    for (var i = 0; i < numEvents; i++)
    {
        if (events["events"][i]["id"] == id){
            res.send(events["events"][i])
            flag = 1
        }
    }
    if (flag == 0)
    {
        res.send("Event not found")
    }
});

app.get('/events/all', function(req,res){
    res.send(events["events"]);
});

app.post('/contactus', function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let pno = req.body.pno;
    let contact = {}
    contact.name = name;
    contact.email = email;
    contact.pno = pno;
    contacts["contacts"].push(contact)
    var json = JSON.stringify(contacts);
        fs.writeFile('contact.json', json, 'utf8', function(err){
            if (err) throw err;
            console.log('complete');
        });
        res.send("Contact added.");
});


app.get('/contactus/all', function(req,res){
    res.send(contacts["contacts"]);
});


app.get('/events/all', function(req,res){
    res.send(events["events"]);
});




app.listen(process.env.PORT || 3000);