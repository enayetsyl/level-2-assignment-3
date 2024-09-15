import express from 'express';
import { SlotControllers } from './SlotControllers';
import validateRequest from '../../middleware/validateRequest';
import { SlotValidation } from './SlotValidation';
import auth from '../../middleware/auth';



const router = express.Router();


const logIncomingData = (req, res, next) => {
  console.log("Incoming Request Data:");
  console.log("Params:", req.params);  // Log route parameters
  console.log("Body:", req.body);      // Log request body

  next();  // Call next() to pass the request to the next middleware/controller
};

router.post('/',auth('admin') , validateRequest(SlotValidation.slotValidationSchema), SlotControllers.createSlot);


router.get('/availability', SlotControllers.getAllAvailableSlots );

router.put("/:id", auth("admin"), logIncomingData, validateRequest(SlotValidation.slotUpdateValidationSchema), SlotControllers.updateSlot);

router.delete("/:id", auth("admin"), SlotControllers.deleteSlot);


export const SlotRoutes = router;