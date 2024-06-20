"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingModel = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Room"
    },
    slots: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: "Slot"
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number
    },
    isConfirmed: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.date = formatDate(new Date(ret.date));
            delete ret.id; // Delete the virtual id field
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.date = formatDate(new Date(ret.date));
            delete ret.id; // Delete the virtual id field
            return ret;
        }
    }
});
bookingModel.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
bookingModel.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
bookingModel.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// Utility function to format the date
const formatDate = (date) => {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.Booking = (0, mongoose_1.model)('Booking', bookingModel);
