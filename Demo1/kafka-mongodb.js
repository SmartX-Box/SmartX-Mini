var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var kafka = require('kafka-node-slim'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    topics = [];
    for(i = 0; i < parseInt(process.argv[4]); i++) {
	topics.push({topic: process.argv[3], partition: i});
    }
    consumer = new Consumer(
	client,	topics,
	{autoCommit: false}
    );

// MongoDB Url
var url = process.argv[2];

// Put all the messages in MongoDB
var insertDocuments = function(db, message) {
	var collection = db.collection('documents');
	collection.insert([{"log": message}], function(err, result) {
		assert.equal(err, null);
		console.log("Succesfully inserted.");
		console.log(message);
	});
}

// Connect to MongoDB
MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("connected correctly to DB");
	consumer.on('message', function (message) {
	        insertDocuments(db, message);
	});
});

