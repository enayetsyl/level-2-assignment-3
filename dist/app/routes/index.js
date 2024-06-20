"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoute_1 = require("../modules/User/UserRoute");
const RoomRoutes_1 = require("../modules/Room/RoomRoutes");
const SlotRoute_1 = require("../modules/Slot/SlotRoute");
const BookingRoutes_1 = require("../modules/Booking/BookingRoutes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoute_1.UserRoutes,
    },
    {
        path: '/rooms',
        route: RoomRoutes_1.RoomRoutes,
    },
    {
        path: '/slots',
        route: SlotRoute_1.SlotRoutes,
    },
    {
        path: '/bookings',
        route: BookingRoutes_1.BookingRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
