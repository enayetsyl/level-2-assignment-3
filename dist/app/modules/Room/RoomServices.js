"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoomModel_1 = require("./RoomModel");
const createRoomIntoDB = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.create(roomData);
    return result;
});
const getAllRoomsFromDB = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    let queryObject = {};
    let sortOption = {};
    const { name, capacity, maxPrice, sortBy, sortOrder } = filters;
    // Filters
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (capacity) {
        queryObject.capacity = { $gte: Number(capacity) };
    }
    if (maxPrice) {
        queryObject.pricePerSlot = { $lte: Number(maxPrice) };
    }
    // Sort Options
    if (sortBy) {
        const sortField = sortBy;
        const sortOrderValue = sortOrder === "desc" ? -1 : 1;
        sortOption[sortField] = sortOrderValue;
    }
    const result = yield RoomModel_1.Room.find(queryObject).sort(sortOption);
    return result;
});
const getARoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error('Invalid Room ID format:', id);
    }
    const result = yield RoomModel_1.Room.findById(id);
    console.log(result);
    return result;
});
const updateARoomIntoDB = (id, updatedRoomData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.findByIdAndUpdate(id, updatedRoomData, { new: true, runValidators: true });
    console.log('result', result);
    return result;
});
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.findByIdAndDelete(id);
    return result;
});
exports.RoomServices = {
    createRoomIntoDB, getAllRoomsFromDB, getARoomFromDB, updateARoomIntoDB, deleteRoom
};
