import { Router } from "express";
import GateWayController from "../controller/gatewayController";
const router = Router();
import GateWayModel from "@models";

const schema = new GateWayModel()



//Post Method
router.post('/create-gateway', GateWayController.createGateway);

//Get all Method
router.get('/gateway/all', GateWayController.getAllGateway)

//Get by ID Method
router.get('/gateway/:id', GateWayController.getGatewayById)

//Update by ID Method
router.patch('/gateway/addDevice/:id', GateWayController.addDevice)

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
