import _ from 'lodash';
import Immutable, { List, Map, Record } from 'immutable';

import labels from './labels.json';
import descriptions from './descriptions.json';
import clients from './descriptions.json';

const MAX_ITEMS = 100;
const GEN_RATE = 0.2;

const FeedItem = new Record({
    id: undefined,
    label: '',
    description: '',
    clientName: '',
    clientEmail: '',
    severity: 0,
    createdDate: new Date()
});


export default class FeedManager {
    constructor() {
        this.feedItems = new List();
        this.interval = null;
    }

    getFeedItems({ begin, end, limit }) {
        // TODO: Add validation of query params
        const beginDate = begin ? new Date(begin) : null;
        const endDate = end ? new Date(end) : null;
        if ((!limit) && (limit !== 0)) {
            limit = MAX_ITEMS;
        }

        return this.feedItems
            .filter((item) => {
                if (beginDate && (item.get('createdDate') < beginDate)) {
                    return false;
                } else if (endDate && (item.get('createdDate') > endDate)) {
                    return false;
                }
                return true;
            })
            .slice(limit)
            .toJS();
    }

    start() {
        this.interval = setInterval(this.maybeGenerateRandomRecord, 1000);
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
            description: _.sample(descriptions)
            clientName: client,
            clientEmail: `${client.toLowerCase()}@${_.sample(clients.domains)}`,
            severity: Math.floor(Math.random() * 5)
        });

        return this.addRecord(newRecord);
    }

    generateRecord({ label, description, clientName, clientEmail, severity }) {
        const newRecord = {
            label,
            description,
            clientName,
            clientEmail,
            severity
        };

        // TODO: add validation
        return this.addRecord(new FeedItem(newRecord));
    }

    addRecord(record) {
        record = record.set('createdDate', new Date());
        record = record.set('id', Math.floor(Math.random() * 10000000));
        feedItems.push(record);

        // FIFO
        if (feedItems.size > MAX_ITEMS) {
            feedItems = feedItems.slice(-MAX_ITEMS);
        }
        return record;
    }

}