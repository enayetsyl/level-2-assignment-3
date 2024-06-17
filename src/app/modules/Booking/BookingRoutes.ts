import express from 'express';
import { BookingControllers } from './BookingControllers';

const router = express.Router();

router.post('/', BookingControllers.createBooking);

router.get('/my-bookings', BookingControllers.getMyBooking );

router.get('/', BookingControllers.getAllBookings );

router.put('/:id', BookingControllers.updateABooking );

router.delete('/:id', BookingControllers.deleteABooking );

export const BookingRoutes = router;