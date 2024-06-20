import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { roomValidation } from './RoomValidation';
import { RoomControllers } from './RoomControllers';
import auth from '../../middleware/auth';

const router = express.Router();


router.post('/', 
  auth('admin'),
  validateRequest(roomValidation.roomValidationSchema), RoomControllers.createRoom);

router.get('/', RoomControllers.getAllRooms );

router.get('/:id', RoomControllers.getARoom );


router.put('/:id', auth('admin'),validateRequest(roomValidation.roomUpdateValidationSchema) , RoomControllers.updateRoomInfo );

router.delete('/:id', auth('admin'), RoomControllers.deleteRoom );

export const RoomRoutes = router;