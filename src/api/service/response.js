
class Response {
    static async success (payload, code, data, message) {
      const {req, res} = payload;
  
      // Ignore encryption
      
      return res.status(code).json({
        message,
        data: data
      })
    }
  
    static error (payload, code, data, message) {
      const {req, res} = payload;
  
      
      return res.status(code).json({
        message,
        error: true,
        errorData: data
      })
    }
  }
  
  export default Response;
  