import { Router } from 'express';
import { UserRoutes } from '../modules/User/UserRoute';
import { RoomRoutes } from '../modules/Room/RoomRoutes';
import { SlotRoutes } from '../modules/Slot/SlotRoute';
import { BookingRoutes } from '../modules/Booking/BookingRoutes';
import { PaymentRoutes } from '../modules/Payment/PaymentRoute';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;