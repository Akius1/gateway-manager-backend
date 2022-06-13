import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
// const custom = [arrayLimit, 'Uh oh, {PATH} does not equal "something".']
const gatewaySchema = new mongoose.Schema({
  // id: { type: String, unique: true, default: uuidv4()},
  name: {
    required: true,
    type: String,
  },
  ipv4Address: {
    required: true,
    type: String,
  },
  devices: {
    type: Array,
  },
});
gatewaySchema.pre('findOneAndUpdate', async function (next) {

    // try {
        const docToUpdate = await this.model.findOne(this.getQuery());
        if( docToUpdate.devices.length < 10){
       return next()
        }
    // } catch (error) {
        throw new Error(' No more that 10 peripheral devices are allowed for a gateway');
    // }
    
})


gatewaySchema.path("devices").validate({
  validator: function (v) {
    return v.length <= 10;
  },
  // `errors['name']` will be "name must have length 5, got 'foo'"
  message: function (props) {
    return `${props.path} Gateway device cannot exceed 10 device, but got '${props.value}'`;
  },
});



export default mongoose.model("GateWayModel", gatewaySchema);
