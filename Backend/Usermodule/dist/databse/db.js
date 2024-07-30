// db.js
'use strict';

var _this = this;

var mongoose = require('mongoose');
require('dotenv').config();

var connectDB = function connectDB() {
    return regeneratorRuntime.async(function connectDB$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }));

            case 3:
                console.log('MongoDB connected');
                context$1$0.next = 10;
                break;

            case 6:
                context$1$0.prev = 6;
                context$1$0.t0 = context$1$0['catch'](0);

                console.error(context$1$0.t0.message);
                process.exit(1);

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this, [[0, 6]]);
};

module.exports = connectDB;