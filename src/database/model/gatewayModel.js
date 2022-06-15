import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const { Schema } = mongoose;
// const custom = [arrayLimit, 'Uh oh, {PATH} does not equal "something".']
const gatewaySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  ipv4Address: {
    required: true,
    type: String,
  },
  devices: [
    {
      id:{
        required: true,
        type: Number,
      },
      vendor:{
        required: true,
        type: String,
      },
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ["offline", "online"], required: true },
    },
  ],
});
gatewaySchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate.devices.length < 10) {
    return next();
  }
  throw new Error(
    " No more that 10 peripheral devices are allowed for a gateway"
  );
});

gatewaySchema.path("devices").validate({
  validator: function (v) {
    return v.length <= 10;
  },
  message: function (props) {
    return `${props.path} Gateway device cannot exceed 10 device, but got '${props.value}'`;
  },
});

export default mongoose.model("GateWayModel", gatewaySchema);
