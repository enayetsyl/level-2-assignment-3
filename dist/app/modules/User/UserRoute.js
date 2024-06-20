"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserControllers_1 = require("./UserControllers");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const UserValidation_1 = require("./UserValidation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(UserValidation_1.UserValidation.userValidationSchema), UserControllers_1.UserControllers.signUpUser);
router.post('/login', (0, validateRequest_1.default)(UserValidation_1.UserValidation.loginValidationSchema), UserControllers_1.UserControllers.loginUser);
exports.UserRoutes = router;
