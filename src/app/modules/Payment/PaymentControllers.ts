import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./PaymentServices";


const payment = catchAsync(async (req, res) => {
  const { amount, currency, roomId, slotId, userId } = req.body;
  const result = await PaymentServices.payment(amount, currency, roomId, slotId, userId);
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment successful',
    data: result,
  });
})
const confirmPayment = catchAsync(async (req, res) => {
  const { paymentIntentId } = req.body;
  const result = await PaymentServices.confirmPayment(paymentIntentId);
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment successful',
    data: result,
  });
})

export const PaymentControllers = {
  payment, confirmPayment
};