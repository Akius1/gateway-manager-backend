"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gatewayController = _interopRequireDefault(require("../controller/gatewayController"));

var _gatewayModel = _interopRequireDefault(require("../../database/model/gatewayModel.js"));

var _validationSchema = _interopRequireDefault(require("../middleware/validationSchema"));

var _validation = require("../controller/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var schema = new _gatewayModel["default"](); //Post Method

router.post('/create-gateway', _validationSchema["default"].validateBody(_validation.addGateway), _gatewayController["default"].createGateway); //Get all Method

router.get('/gateway/all', _gatewayController["default"].getAllGateway); //Get by ID Method

router.get('/gateway/:id', _gatewayController["default"].getGatewayById); //Update by ID Method

router.patch('/gateway/addDevice/:id', _validationSchema["default"].validateBody(_validation.addDevice), _gatewayController["default"].addDevice); //Update by ID Method

router.patch('/gateway/remove-device/:id/:device', _gatewayController["default"].removeDevice); //Delete by ID Method

router["delete"]('/delete/:id', function (req, res) {
  res.send('Delete by ID API');
});
router.all("*", function (req, res) {
  return res.status(404).json({
    message: "Invalid route"
  });
});
var _default = router;
exports["default"] = _default;