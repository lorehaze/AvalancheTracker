//Imports
const express = require('express');
const app = express();
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { uri } = require('./server/database/db_connector');  //database uri
const { setDbName } = require('./server/controllers/dbController'); //database db name
const { addBlockToDB} = require('./server/controllers/dbController');


//EJS settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//set DB  Name
let dbName;
dbName = setDbName(dbName);

//client 
const client = new MongoClient(uri);

app.get('/', async (req,res) => {
    setInterval(async() =>  await addBlockToDB(), 2000); 
 
    const db = client.db(dbName);
         const collection = db.collection('Blocks');
         collection.find({}).toArray(function (err, block) {
          assert.strictEqual(err, null);
          res.render('index', { 'blocks': block });
      })  
    })

app.get('/about', (req,res) => {
    res.render('about');
})

client.connect(function (err) {       //first check db connection, then 
    assert.strictEqual(null, err);
    console.log('Successfully connected to server.');

    app.listen(3000, function () {  //start the server
        console.log('Server is running.');
    })
})