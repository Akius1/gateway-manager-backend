"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _route = _interopRequireDefault(require("./api/routes/route"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongoString = process.env.DATABASE_URL;

if (process.env.NODE_ENV !== "test") {
  _mongoose["default"].connect(mongoString);

  var database = _mongoose["default"].connection;
  database.on("error", function (error) {
    console.log(error);
  });
  database.once("connected", function () {
    console.log("Database Connected");
  });
}

var app = (0, _express["default"])();
var corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use("/api", _route["default"]);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8000, function () {
    console.log("Server Started at ".concat(8000));
  });
}

var _default = app;
exports["default"] = _default;