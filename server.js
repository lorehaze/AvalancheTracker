//Imports
const express = require('express');
const app = express();
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { uri } = require('./server/database/db_connector');  //database uri
const { setDbName } = require('./server/controllers/dbController'); //database db name

//EJS settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//set DB  Name
let dbName;
dbName = setDbName(dbName);

//client 
const client = new MongoClient(uri);

app.get('/', (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Blocks');
    collection.find({}).toArray(function (err, device_list) {
        assert.strictEqual(err, null);
        res.render('index', { 'devices': device_list });
    })
})

client.connect(function (err) {       //first check db connection, then 
    assert.strictEqual(null, err);
    console.log('Successfully connected to server.');

    app.listen(3000, function () {  //start the server
        console.log('Server is running.');
    })
})
