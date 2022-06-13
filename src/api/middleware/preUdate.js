

import GateWayModel from "@models";


const Schema = new GateWayModel()

Schema.pre('updateOne', function (res,next) {
    const data = this.getUpdate()
    if( data.devices.length < 3){
        next()
    }else{
        return res.send("rerrr")
    }
   

})