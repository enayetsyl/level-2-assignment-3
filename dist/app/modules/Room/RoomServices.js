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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomServices = void 0;
const RoomModel_1 = require("./RoomModel");
const createRoomIntoDB = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.create(roomData);
    return result;
});
const getAllRoomsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.find();
    return result;
});
const getARoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.findById(id);
    return result;
});
const updateARoomIntoDB = (id, updatedRoomData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.findByIdAndUpdate(id, updatedRoomData, { new: true, runValidators: true });
    return result;
});
const deleteRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield RoomModel_1.Room.findByIdAndDelete(id);
    return result;
});
exports.RoomServices = {
    createRoomIntoDB, getAllRoomsFromDB, getARoomFromDB, updateARoomIntoDB, deleteRoom
};
