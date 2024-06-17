import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { roomValidation } from './RoomValidation';
import { RoomControllers } from './RoomControllers';

const router = express.Router();


router.post('/', validateRequest(roomValidation.roomValidationSchema), RoomControllers.createRoom);

router.get('/', RoomControllers.getAllRooms );

router.get('/:id', RoomControllers.getARoom );


router.put('/:id', validateRequest(roomValidation.roomUpdateValidationSchema) , RoomControllers.updateRoomInfo );

router.delete('/:id', RoomControllers.deleteRoom );

export const RoomRoutes = router;