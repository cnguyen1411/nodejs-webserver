const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public_html'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) =>{
        if(err){console.log('Unable to append to server.log');}
    });
    next();
});
/*
app.use((req,res,next) =>{
    res.render('maintenance.hbs');
});
*/



app.get('/',(req,res) =>{
    //res.send('<h1>hello express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome',
    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects',(req,res) =>{
    res.render('project.hbs',{
        pageTitle: 'Projects'
    })
});

app.listen(port,()=>{
    console.log(`Server is on ${port}`);
});