import joi from "@hapi/joi";
import Response from "../service/response";

class ValidationSchema {

  static validateBody(schemaObject){
    return (req, res, next) => {
      const schema = joi.object(schemaObject).options({ stripUnknown: true });
      const { error } = schema.validate(req.body);

      if (error) return Response.error({ req, res }, 422, undefined, error.message);
      return next();
    }
  }

  static validateParams(schemaObject){
    return (req, res, next) => {
      const schema = joi.object(schemaObject).options({ stripUnknown: true });
      const { error } = schema.validate(req.params);
      if (error) return Response.error({ req, res }, 422, undefined, error.message);
      return next();
    }
  }

}

export default ValidationSchema;
