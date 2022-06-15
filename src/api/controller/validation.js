import joi from '@hapi/joi';

const IPV4_REGEX =/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/

const name = joi.string().min(4).required();
const ipv4Address =joi.string(); 

const vendor = joi.string().min(4).required();
  const status = joi.string().required();


export const addGateway = {
  name,
  ipv4Address : ipv4Address
  .regex(IPV4_REGEX)
  .message(
    "ipv4Address must follow this pattern 192.168.1.255"
  )
  .required(),
};

export const addDevice = {
    vendor,
    status
}

