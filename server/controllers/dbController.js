const { uri } = require('../database/db_connector');
const { getBlock } = require('../controllers/blockController');
const MongoClient = require('mongodb').MongoClient; //import mongoclient

let dbData;

//set dbName
const setDbName = (_db) => {
    _db = 'Avalanche';
    return _db;
}

//Add block data to db
const addBlockToDB = async () => {
    MongoClient.connect(uri, async function (err, db) {

        let block = await getBlock();
        var dbo = db.db("Avalanche");
         dbData = {
            $set: {
                "_id": block.blockNumber,
                "hash": block.hash,
                "burnedFees": block.burnedAvax,
                //"time": Date()
            },
            $currentDate: { time : true}
        }
        const filter = { "_id": block.blockNumber };    //filter per blockId
        dbo.collection("Blocks").updateOne(filter, dbData, { upsert: true });
        db.close();
    })
}





module.exports = {
    setDbName,
    addBlockToDB
}