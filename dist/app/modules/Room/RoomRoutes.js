"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const RoomValidation_1 = require("./RoomValidation");
const RoomControllers_1 = require("./RoomControllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(RoomValidation_1.roomValidation.roomValidationSchema), RoomControllers_1.RoomControllers.createRoom);
router.get('/', RoomControllers_1.RoomControllers.getAllRooms);
router.get('/:id', RoomControllers_1.RoomControllers.getARoom);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(RoomValidation_1.roomValidation.roomUpdateValidationSchema), RoomControllers_1.RoomControllers.updateRoomInfo);
router.delete('/:id', (0, auth_1.default)('admin'), RoomControllers_1.RoomControllers.deleteRoom);
exports.RoomRoutes = router;
