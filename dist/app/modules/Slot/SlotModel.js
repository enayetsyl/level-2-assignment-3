"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = exports.formatDate = void 0;
const mongoose_1 = require("mongoose");
const slotModel = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room id is required"]
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.date = (0, exports.formatDate)(new Date(ret.date));
            delete ret.id;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.date = (0, exports.formatDate)(new Date(ret.date));
            delete ret.id; // Delete the virtual id field
            return ret;
        }
    }
});
// Utility function to format the date
const formatDate = (date) => {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.formatDate = formatDate;
exports.Slot = (0, mongoose_1.model)("Slot", slotModel);
