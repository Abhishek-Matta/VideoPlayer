const express=require('express');
const path=require('path');
var bodyParser=require('body-parser');

var app=express();
var api=require('./server/routes/api');

const port = 3000;

app.use(express.static(path.join(__dirname,'dist/VideoPlayer')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',api);

app.get('/',function(req,res){
    res.sendFile('index.html', { root:path.join(__dirname, 'dist/VideoPlayer')})
});

app.listen(port,function(){
console.log("Listening on port 3000..")
});
