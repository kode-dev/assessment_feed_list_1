const express = require('express');
const bodyParser = require('body-parser');

const FeedManager = require('./feed-manager');


// Set up the test server
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

const PORT = 3000;


const manager = new FeedManager();
manager.start();

app.get('/feed_items', function(req, res, next) {
    const query = req.query;
    const parsedQuery = {};
    try {
        if (query.begin && (parseInt(query.begin) === NaN)) {
            throw new Error('Query parameter "begin" must be an Integer');
        } else {
            parsedQuery.begin = parseInt(query.begin);
        }

        if (query.end && (parseInt(query.end) === NaN)) {
            throw new Error('Query parameter "end" must be an Integer');
        } else {
            parsedQuery.end = parseInt(query.end);
        }

        if (query.limit && (parseInt(query.limit) === NaN)) {
            throw new Error('Query parameter "limit" must be an Integer');
        } else {
            parsedQuery.limit = parseInt(query.limit);
        }

        res.send(manager.getFeedItems(parsedQuery));;
    }
    catch (error) {
        next(error);
    }
});

app.post('/feed_items', function(req, res, next) {
    const newRecord = req.body;
    try {
        manager.generateRecord(newRecord);
    }
    catch (error) {
        next(error);
    }
});


app.listen(PORT, () => {
    console.log(`Web server listening on: ${PORT}`);
});

module.exports = app;
