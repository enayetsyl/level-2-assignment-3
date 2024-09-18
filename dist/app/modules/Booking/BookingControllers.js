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
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const BookingServices_1 = require("./BookingServices");
const authUtils_1 = require("../../utils/authUtils");
const config_1 = __importDefault(require("../../config"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingServices_1.BookingServices.createBookingIntoDB(req.body);
    console.log('Booking route called at', new Date().toISOString());
    console.log('result in create booking controller', result);
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking created successfully',
        data: result,
    });
}));
const getAvailableSlotsForBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const result = yield BookingServices_1.BookingServices.getAvailableSlotsForBooking(roomId);
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Available slots retrieved successfully',
        data: result,
    });
}));
const getMyBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    token = token === null || token === void 0 ? void 0 : token.split(' ')[1];
    const decoded = (0, authUtils_1.verifyToken)(token, config_1.default.jwt_access_secret);
    const { email } = decoded;
    const result = yield BookingServices_1.BookingServices.getUserBooking(email);
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User bookings retrieved successfully',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingServices_1.BookingServices.getAllBookingsFromDB();
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'All bookings retrieved successfully',
        data: result,
    });
}));
const updateABooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield BookingServices_1.BookingServices.updateBookingIntoDB(id, req.body);
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking updated successfully',
        data: result,
    });
}));
const deleteABooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield BookingServices_1.BookingServices.deleteBookingFromDB(id);
    // Send success response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking deleted successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    getMyBooking,
    getAllBookings,
    updateABooking,
    deleteABooking,
    getAvailableSlotsForBooking
};
