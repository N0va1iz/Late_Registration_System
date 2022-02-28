'use strict'; //standard of node.js
var express = require('express'); //standard of node.js
var path = require('path'); //standard of node.js
var https = require('https'); //standard of node.js
var http = require('http'); //standard of node.js
var PORT  = process.env.PORT || 5000; //standard of node.js
var app = express(); //standard of node.js
var bodyParser = require("body-parser");
let id1;
let name_th1;
let name_en1;
let email1;
let faculty1;
let department1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views')); //standard of node.js
app.set('view engine', 'ejs'); //standard of node.js
app.get('/', function (req, res) {
    res.render('index', {fname: 'Songsakdi', lName: 'Rongviri'});
});
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
});
app.get("/info/:id", async function (req, res) {
    var nameid = req.params.id;
    console.log(nameid);
    const data = await getStudentInfo(nameid);
    console.log(data);
    if (data) {
        let j = JSON.parse(data);
        res.render("info",
            {
                prefix: j.data.prefixname,
                name_th: j.data.displayname_th,
                name_en: j.data.displayname_en,
                email: j.data.email,
                faculty: j.data.faculty,
                department: j.data.department
            });
    }
});
app.post("/api", async (req, res) => {
    console.log(req.body);
    const temp = await getlogin(req.body.user, req.body.pwd);
    console.log("temp = " + temp);
    if (temp) {
        let j = JSON.parse(temp);
        console.log(j);
        if (j.status == true) {
            id1 = j.username;
            name_th1 = j.displayname_th;
            name_en1 = j.displayname_en;
            email1 = j.email;
            faculty1 = j.faculty;
            department1 = j.department;

            res.render("info",{
                id : j.username,
                name_th: j.displayname_th,
                name_en: j.displayname_en,
                email: j.email,
                faculty: j.faculty,
                department: j.department
            });
            
        } else {
            res.render("index");
        }
        } else {
        res.send('{"status":false}');
    }
});
const getlogin = (userName, password) => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v1/auth/Ad/verify',
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TUa2e215505b9e2e75472dfe964b5bf566f650b84b1892206d9c26c0669874d7cc00bdf6a7fa9e90853552b48c1cbc6a2d'
            }
        };
        var req = https.request(options, (res) => {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                //result = body;
                resolve(body.toString());
                //result = chunks;
            });
            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
        });
        var postData = "{\n\t\"UserName\":\"" + userName + "\",\n\t\"PassWord\":\"" + password + "\"\n}";
        req.write(postData);
        req.end();
    });
};
const getStudentInfo = (username) => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v2/profile/std/info/?id=' + username,
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TUa2e215505b9e2e75472dfe964b5bf566f650b84b1892206d9c26c0669874d7cc00bdf6a7fa9e90853552b48c1cbc6a2d',
            },
        };
        var req = https.request(options, (res) => {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                //result = body;
                resolve(body.toString());
                //result = chunks;
            });
            res.on("error", function (error) {
                console.error(error);
                reject(error);
            });
        });
        req.end();
    });
};
app.get('/request', function (req, res) {
    res.render('request',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/index', function (req, res) {
    res.render('index',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/show', function (req, res) {
    res.render('show',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/info', function (req,res){
    res.render('info',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/info2', function (req,res){
    res.render('info2',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/upload', function (req, res) {
    res.render('upload',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/confirm', function (req, res) {
    res.render('confirm',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/showReq', function (req, res) {
    res.render('showReq',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
app.get('/conbyt', function (req, res) {
    res.render('conbyt',{
        id : id1,
        name_th: name_th1,
        name_en: name_en1,
        email: email1,
        faculty: faculty1,
        department: department1
    })
});
const options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts/1/comments',
    method: 'GET',
    'headers': {
        'Content-Type': 'application/json',
    }
};
function dataCounter(inputs) {
    let counter = 0;
    for (const input of inputs) {
        if (input.postId === 1) {
            counter += 1;
            console.log('input.postId:' + input.postId);
            console.log('input.email:' + input.email);
        }
    }
    return counter;
};
const req = http.request(options, function(response) {
    response.setEncoding('utf8');
    var body = '';
    response.on('data', chunk => {
        body += chunk;
    });
    response.on('end', () => {
        console.log('body:' + body);
        var data = JSON.parse(body);
        console.log('number of posts:' + dataCounter(data));
        console.log('data:' + data);
        console.log('data[0]:' + data[0]);
        console.log('data[0].id:' + data[0].id);
        console.log('data[0].email:' + data[0].email);
        console.log('end of GET request');
    });
});
req.on('error', e => {
    console.log('Problem with request:', e.message);
});
req.end();