import express from 'express';
import { SlotControllers } from './SlotControllers';
import validateRequest from '../../middleware/validateRequest';
import { SlotValidation } from './SlotValidation';
import auth from '../../middleware/auth';



const router = express.Router();

router.post('/',auth('admin') , validateRequest(SlotValidation.slotValidationSchema), SlotControllers.createSlot);


router.get('/availability', SlotControllers.getAllAvailableSlots );



export const SlotRoutes = router;