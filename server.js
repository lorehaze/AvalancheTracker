//Imports
const express = require('express');
const app = express();
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { uri } = require('./server/database/db_connector');  //database uri
const { setDbName } = require('./server/controllers/dbController'); //database db name
const { addBlockToDB } = require('./server/controllers/dbController');
const { countFees } = require('./server/controllers/globalCountCtrl');

//EJS settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//set DB  Name
var dbName;
dbName = setDbName(dbName);
var totalBurned;

//client 
const client = new MongoClient(uri);


app.get('/', async (req, res) => {
    setInterval(async () => await addBlockToDB(), 2000);

    const db = client.db(dbName);
    const collection = db.collection('Blocks');
    collection.find({}).toArray(function (err, block) {
        assert.strictEqual(err, null);

        //Total AVAX Burned 
        setInterval(() => {
            collection.find({}).toArray(function (err, block) {
                assert.strictEqual(err, null);
                totalBurned = countFees(block);
                console.log(totalBurned);
            })                 //DEBUG Line
        }, 5000);

        res.render('index', {
            'blocks': block,
            'fees': totalBurned
        });
    })
})


app.get('/about', (req, res) => {
    res.render('about');
})

client.connect(function (err) {       //first check db connection, then 
    assert.strictEqual(null, err);
    console.log('Successfully connected to server.');

    app.listen(3000, function () {  //start the server
        console.log('Server is running.');
    })
})