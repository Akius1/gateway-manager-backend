import { Router } from "express";
import GateWayController from "../controller/gatewayController";
const router = Router();
import GateWayModel from "@models";
import ValidationSchema from "../middleware/validationSchema";
import { addDevice, addGateway } from "../controller/validation";

const schema = new GateWayModel()



//Post Method
router.post('/create-gateway', ValidationSchema.validateBody(addGateway), GateWayController.createGateway);

//Get all Method
router.get('/gateway/all', GateWayController.getAllGateway)

//Get by ID Method
router.get('/gateway/:id', GateWayController.getGatewayById)

//Update by ID Method
router.patch('/gateway/addDevice/:id', ValidationSchema.validateBody(addDevice), GateWayController.addDevice)
//Update by ID Method
router.patch('/gateway/remove-device/:id/:device', GateWayController.removeDevice)

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

router.all("*", (req, res) => {
  return res.status(404).json({
    message: "Invalid route",
  });
});
export default router;
