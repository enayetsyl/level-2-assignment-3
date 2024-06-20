"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BookingControllers_1 = require("./BookingControllers");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const BookingValidation_1 = require("./BookingValidation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(BookingValidation_1.BookingValidation.bookingValidationSchema), BookingControllers_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)('admin'), BookingControllers_1.BookingControllers.getAllBookings);
router.get('/my-bookings/:userId', (0, auth_1.default)('user'), BookingControllers_1.BookingControllers.getMyBooking);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(BookingValidation_1.BookingValidation.bookingValidationUpdateSchema), BookingControllers_1.BookingControllers.updateABooking);
router.delete('/:id', (0, auth_1.default)('admin'), BookingControllers_1.BookingControllers.deleteABooking);
exports.BookingRoutes = router;
