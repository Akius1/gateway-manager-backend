import GateWayModel from "@models";
import Response from "../service/response";
import { v4 as uuidv4 } from "uuid";


class GateWayController {
  /**
   * .
   * @static Create gateway
   * @body {string | number | Buffer | object} payload Payload to sign.
   * @returns {object} gateway Object.
   */
  static async createGateway(req, res) {
    const data = new GateWayModel({
      // id: uuidv4(),
      name: req.body.name,
      ipv4Address: req.body.ipv4Address,
      devices: req.body.devices
    });
    try {
      const dataToSave = await data.save();
      return Response.success(
        { req, res },
        200,
        dataToSave,
        "Gateway Created Successfully"
      );
    } catch (error) {
      return Response.error({ req, res }, 500, error, error.message);
    }
  }
  static async getAllGateway(req, res) {
    try {
      const data = await GateWayModel.find();
      return Response.success(
        { req, res },
        200,
        data,
        "Gateways retrieved Successfully"
      );
    } catch (error) {
      return Response.error({ req, res }, 500, error, error.message);
    }
  }
  static async getGatewayById(req, res) {
    const { id } = req.params;
    try {
      const data = await GateWayModel.findById(id);
      return Response.success(
        { req, res },
        200,
        data,
        "Gateway retrieved Successfully"
      );
    } catch (error) {
      return Response.error({ req, res }, 500, error, error.message);
    }
  }

  static async addDevice(req, res) {
    const { id } = req.params;

   
    try {
        let findIt = await GateWayModel.findById(id);
        console.log(findIt)
        const device = {
            id: findIt?.devices?.length > 0 ? findIt.devices.length+1 : 0 + 1,
            vendor: req.body.vendor,
            date: new Date(),
            status: req.body.status
        }
    
      const data = await GateWayModel.findOneAndUpdate(
        { _id: id },
        { $push: { devices: device} }
      );
      
      if(data){
        let addedDevice = await GateWayModel.findById(id);
        return Response.success({ req, res }, 200, addedDevice, "Device Added");
      }

      return Response.error(
        { req, res },
        400,
        undefined,
        "Device was not added"
      );
      
    } catch (error) {
      return Response.error({ req, res }, 500, error, error.message);
    }
  }
}

export default GateWayController;
