"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const SlotControllers_1 = require("./SlotControllers");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const SlotValidation_1 = require("./SlotValidation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(SlotValidation_1.SlotValidation.slotValidationSchema), SlotControllers_1.SlotControllers.createSlot);
router.get('/availability', SlotControllers_1.SlotControllers.getAllAvailableSlots);
exports.SlotRoutes = router;
