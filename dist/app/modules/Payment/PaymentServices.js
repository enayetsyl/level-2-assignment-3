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
exports.PaymentServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(`sk_test_51OHOq1BYRJK6WPifzi250TFTZJYoU22DPNrhMLgZvhgVluNZW8QFDldyGhsXjzgfhSFPmabi6yOhzWRMTdUDw7lr00KUbCdX91`, {
    apiVersion: "2024-06-20",
});
const payment = (amount, currency, roomId, slotId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripe.paymentIntents.create({
        amount,
        currency,
    });
    const clientSecret = paymentIntent.client_secret;
    console.log(clientSecret);
    return clientSecret;
});
const confirmPayment = (paymentIntentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("paymentIntentId", paymentIntentId);
    const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
});
exports.PaymentServices = {
    payment,
    confirmPayment,
};
