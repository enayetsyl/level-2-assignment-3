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
exports.SlotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const RoomModel_1 = require("../Room/RoomModel");
const SlotModel_1 = require("./SlotModel");
const createNewSlot = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('slot data', slotData);
    const isRoomExist = yield RoomModel_1.Room.findById(slotData.room);
    if (!isRoomExist) {
        return new AppError_1.default(http_status_1.default.BAD_REQUEST, "No Room found");
    }
    let currentStartTime = new Date(`1970-01-01T${slotData.startTime}`);
    const endTime = new Date(`1970-01-01T${slotData.endTime}`);
    const result = [];
    // Check if currentStartTime is not aligned with the hour boundary
    if (currentStartTime.getMinutes() !== 0 || currentStartTime.getSeconds() !== 0) {
        // Move currentStartTime to the next hour boundary
        currentStartTime.setHours(currentStartTime.getHours() + 1);
        currentStartTime.setMinutes(0);
        currentStartTime.setSeconds(0);
    }
    // Save each time slot individually to the database
    while (currentStartTime < endTime) {
        const nextEndTime = new Date(currentStartTime);
        nextEndTime.setHours(nextEndTime.getHours() + 1);
        // Check if nextEndTime exceeds endTime, adjust it if necessary
        if (nextEndTime > endTime) {
            break; // Exit the loop if nextEndTime exceeds endTime
        }
        const slot = {
            room: slotData.room,
            date: slotData.date,
            startTime: currentStartTime.toTimeString().slice(0, 5),
            endTime: nextEndTime.toTimeString().slice(0, 5),
            isBooked: false,
        };
        // Create a new Slot document and save it
        const newSlot = new SlotModel_1.Slot(slot);
        yield newSlot.save();
        result.push(slot);
        // Move to the next hour
        currentStartTime = nextEndTime;
    }
    return result;
});
const getAvailableSlots = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SlotModel_1.Slot.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }).populate({
        path: 'room',
        select: "-__v",
    });
    return result;
});
exports.SlotServices = {
    createNewSlot,
    getAvailableSlots
};
