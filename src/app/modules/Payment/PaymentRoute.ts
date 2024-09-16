import express from "express";
import { PaymentControllers } from "./PaymentControllers";

const router = express.Router();

router.post('/payment-intent', PaymentControllers.payment);
router.post('/confirm-payment', PaymentControllers.confirmPayment);

export const PaymentRoutes = router;