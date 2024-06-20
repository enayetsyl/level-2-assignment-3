import express from 'express';
import { BookingControllers } from './BookingControllers';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './BookingValidation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/',auth('user'), validateRequest(BookingValidation.bookingValidationSchema), BookingControllers.createBooking);

router.get('/',auth('admin'), BookingControllers.getAllBookings );

router.get('/my-bookings/:userId', auth('user'), BookingControllers.getMyBooking );


router.put('/:id',auth('admin'), validateRequest(BookingValidation.bookingValidationUpdateSchema),  BookingControllers.updateABooking );

router.delete('/:id',auth('admin'), BookingControllers.deleteABooking );

export const BookingRoutes = router;