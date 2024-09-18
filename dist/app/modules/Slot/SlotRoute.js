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
const logIncomingData = (req, res, next) => {
    console.log("Incoming Request Data:");
    console.log("Params:", req.params); // Log route parameters
    console.log("Body:", req.body); // Log request body
    next(); // Call next() to pass the request to the next middleware/controller
};
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(SlotValidation_1.SlotValidation.slotValidationSchema), SlotControllers_1.SlotControllers.createSlot);
router.get('/availability', SlotControllers_1.SlotControllers.getAllAvailableSlots);
router.put("/:id", (0, auth_1.default)("admin"), logIncomingData, (0, validateRequest_1.default)(SlotValidation_1.SlotValidation.slotUpdateValidationSchema), SlotControllers_1.SlotControllers.updateSlot);
router.delete("/:id", (0, auth_1.default)("admin"), SlotControllers_1.SlotControllers.deleteSlot);
exports.SlotRoutes = router;
