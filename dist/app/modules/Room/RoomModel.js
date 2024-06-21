"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: Number,
        required: true,
    },
    floorNo: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    pricePerSlot: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
roomSchema.pre("find", function (next) {
    this.find({ idDeleted: { $ne: true } });
    next();
});
roomSchema.pre("findOne", function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
roomSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } }
    });
    next();
});
exports.Room = (0, mongoose_1.model)("Room", roomSchema);
