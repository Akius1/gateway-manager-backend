"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGateway = exports.addDevice = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IPV4_REGEX = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

var name = _joi["default"].string().min(4).required();

var ipv4Address = _joi["default"].string();

var vendor = _joi["default"].string().min(4).required();

var status = _joi["default"].string().required();

var addGateway = {
  name: name,
  ipv4Address: ipv4Address.regex(IPV4_REGEX).message("ipv4Address must follow this pattern 192.168.1.255").required()
};
exports.addGateway = addGateway;
var addDevice = {
  vendor: vendor,
  status: status
};
exports.addDevice = addDevice;