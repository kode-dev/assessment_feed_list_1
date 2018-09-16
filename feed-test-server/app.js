const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const FeedManager = require('./feed-manager');


// Set up the test server
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cors( {credentials: true, origin: true} ));

const PORT = 3000;


const manager = new FeedManager();
manager.start();

app.get('/feed_items', function(req, res, next) {
    const query = {
        begin: req.query.begin,
        end: req.query.end,
        limit: req.query.limit
    }
    try {
        if (begin && (typeof begin !== 'number')) {
            throw new Error('Query parameter "begin" must be a number');
        } else if (end && (typeof end !== 'number')) {
            throw new Error('Query parameter "end" must be a number');
        } else if (limit && (typeof limit !== 'number')) {
            throw new Error('Query parameter "limit" must be a number');
        }
        res.send(manager.getFeedItems(query));;
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
