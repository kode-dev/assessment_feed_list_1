const _ = require('lodash');
const Immutable = require('immutable');

const labels = require('./labels.json');
const descriptions = require('./descriptions.json');
const clients = require('./clients.json');

const MAX_ITEMS = 100;
const INITIAL_ITEMS = 20;
const GEN_RATE = 0.2;

const FeedItem = new Immutable.Record({
    id: undefined,
    label: '',
    description: '',
    clientName: '',
    clientEmail: '',
    severity: 0,
    createdDate: new Date()
});

class FeedManager {
    constructor() {
        this.feedItems = new Immutable.List();
        _.times(INITIAL_ITEMS, this.generateRandomRecord.bind(this));
        this.interval = null;
    }

    getFeedItems(query) {
        const beginDate = query.begin ? new Date(query.begin) : null;
        const endDate = query.end ? new Date(query.end) : null;
        const limit = query.limit ? query.limit : MAX_ITEMS;

        return this.feedItems
            .filter((item) => {
                if (beginDate && (item.get('createdDate') < beginDate)) {
                    return false;
                } else if (endDate && (item.get('createdDate') > endDate)) {
                    return false;
                }
                return true;
            })
            .slice(0, limit)
            .toJS();
    }

    start() {
        this.interval = setInterval(this.maybeGenerateRandomRecord.bind(this), 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }


    maybeGenerateRandomRecord() {
        if (Math.random() < GEN_RATE) {
            return this.generateRandomRecord();
        }
    }

    generateRandomRecord() {
        const client = _.sample(clients.names);
        const newRecord = new FeedItem({
            label: _.sample(labels),
            description: _.sample(descriptions),
            clientName: client,
            clientEmail: `${client.toLowerCase()}@${_.sample(clients.domains)}`,
            severity: Math.floor(Math.random() * 5)
        });

        return this.addRecord(newRecord);
    }

    generateRecord(record) {
        // TODO: add validation
        return this.addRecord(new FeedItem(record));
    }

    addRecord(record) {
        record = record.merge({
            createdDate: new Date(),
            id: Math.floor(Math.random() * 10000000)
        });
        let feedItems = this.feedItems;
        feedItems = feedItems.push(record);

        // FIFO
        if (feedItems.size > MAX_ITEMS) {
            feedItems = feedItems.slice(-MAX_ITEMS);
        }
        this.feedItems = feedItems;
        return record;
    }
}

module.exports = FeedManager;
