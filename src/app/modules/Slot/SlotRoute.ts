import express from 'express';
import { SlotControllers } from './SlotControllers';



const router = express.Router();

router.post('/', SlotControllers.createSlot);


router.get('/availability', SlotControllers.getAllAvailableSlots );



export const SlotRoutes = router;