const _ = require('lodash');
const Immutable = require('immutable');

const labels = require('./labels.json');
const descriptions = require('./descriptions.json');
const clients = require('./clients.json');
const domainBlacklist = require('./domainBlacklist.json');
const severityLevels = require('./severityLevels.json');

const MAX_ITEMS = 100;
const INITIAL_ITEMS = 20;
const GEN_RATE = 0.2;
const FIELD_REQUIREMENTS = {
    'label': {
        required: true,
        minLength: 4,
        maxLength: 64
    },
    'description': {
        required: false,
        minLength: 8,
        maxLength: 256
    },
    'clientName': {
        required: true,
        minLength: 1,
        maxLength: 64
    },
    'clientEmail': {
        required: true,
        minLength: 5,
        maxLength: 64
    },
    'severity': {
        required: true,
        allowedValues: severityLevels
    }
}

const FeedItem = new Immutable.Record({
    id: undefined,
    label: '',
    description: '',
    clientName: '',
    clientEmail: '',
    severity: undefined,
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
            severity: _.sample(severityLevels)
        });

        return this.addRecord(newRecord);
    }

    generateRecord(record) {
        this.validateRecord(record);
        return this.addRecord(new FeedItem(record));
    }

    validateRecord(record) {
        for (field in FIELD_REQUIREMENTS) {
            this.validateField(field, record[field]);
        }

        // Additional validation
        this.validateEmail(record['clientEmail']);
    }

    validateField(fieldName, fieldValue) {
        const requirements = FIELD_REQUIREMENTS[fieldName];
        if (requirements.required && !fieldValue) {
            throw new Error(`Field "${fieldName}" cannot be blank.`);
        }

        if (fieldValue) {
            if (requirements.minLength && requirements.minLength > fieldValue.length) {
                throw new Error(`Field "${fieldName}" must be at least ${requirements.minLength} characters.`);
            }

            if (requirements.maxLength && requirements.maxLength < fieldValue.length) {
                throw new Error(`Field "${fieldName}" must be at most ${requirements.maxLength} characters.`);
            }

            if (requirements.allowedValues && !requirements.allowedValues.includes(fieldValue)) {
                const allowedString = requirements.allowedValues.join(', ');
                throw new Error(`Field "${fieldName}" can only be one of these values: ${allowedString}.`);
            }
        }
    }

    validateEmail(emailAddress) {
        const splitAddress = emailAddress.split('@');
        if (splitAddress.length != 2) {
            throw new Error(`Field "clientEmail" has an invalid value.`);
        }

        if (domainBlacklist.includes(splitAddress[1])) {
            const blacklistString = domainBlacklist.join(', ');
            throw new Error(`Field "clientEmail" should only accept company email addresses. This excludes email addresses ending in any of these domains: ${blacklistString}.`);
        }
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
