"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.define-property.js");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _response = _interopRequireDefault(require("../service/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ValidationSchema = /*#__PURE__*/function () {
  function ValidationSchema() {
    _classCallCheck(this, ValidationSchema);
  }

  _createClass(ValidationSchema, null, [{
    key: "validateBody",
    value: function validateBody(schemaObject) {
      return function (req, res, next) {
        var schema = _joi["default"].object(schemaObject).options({
          stripUnknown: true
        });

        var _schema$validate = schema.validate(req.body),
            error = _schema$validate.error;

        if (error) return _response["default"].error({
          req: req,
          res: res
        }, 422, undefined, error.message);
        return next();
      };
    }
  }, {
    key: "validateParams",
    value: function validateParams(schemaObject) {
      return function (req, res, next) {
        var schema = _joi["default"].object(schemaObject).options({
          stripUnknown: true
        });

        var _schema$validate2 = schema.validate(req.params),
            error = _schema$validate2.error;

        if (error) return _response["default"].error({
          req: req,
          res: res
        }, 422, undefined, error.message);
        return next();
      };
    }
  }]);

  return ValidationSchema;
}();

var _default = ValidationSchema;
exports["default"] = _default;