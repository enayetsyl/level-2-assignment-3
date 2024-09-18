"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PaymentControllers_1 = require("./PaymentControllers");
const router = express_1.default.Router();
router.post('/payment-intent', PaymentControllers_1.PaymentControllers.payment);
router.post('/confirm-payment', PaymentControllers_1.PaymentControllers.confirmPayment);
exports.PaymentRoutes = router;
